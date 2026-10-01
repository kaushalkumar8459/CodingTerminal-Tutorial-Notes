import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Spinner } from "../components/Spinner";

const apiBaseUrl = import.meta.env.VITE_CONTENT_API_BASE_URL?.trim() ?? "";

type CollectionSummary = {
  name: string;
  count: number;
};

type RawDocument = Record<string, unknown> & { _id?: { $oid?: string } | string };

function getDocumentId(document: RawDocument): string {
  const id = document._id;
  if (typeof id === "string") {
    return id;
  }
  return id?.$oid ?? "";
}

function downloadTextFile(fileName: string, contents: string, mimeType: string) {
  const blob = new Blob([contents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = window.document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function DatabaseExplorerPage() {
  const { user } = useAuth();
  const authHeaders = useMemo<Record<string, string>>(() => {
    const headers: Record<string, string> = {};
    if (user?.token) {
      headers.Authorization = `Bearer ${user.token}`;
    }
    return headers;
  }, [user?.token]);

  const [collections, setCollections] = useState<CollectionSummary[] | null>(null);
  const [activeCollection, setActiveCollection] = useState("");
  const [documents, setDocuments] = useState<RawDocument[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [fieldFilters, setFieldFilters] = useState<Record<string, string>>({});

  const loadCollections = useCallback(async () => {
    try {
      setErrorMessage("");
      const response = await fetch(`${apiBaseUrl}/api/db/collections`, { headers: authHeaders });
      const payload = (await response.json()) as { ok: boolean; message?: string; collections?: CollectionSummary[] };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setCollections(payload.collections ?? []);
      setActiveCollection((current) => current || payload.collections?.[0]?.name || "");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load collections.");
    }
  }, [authHeaders]);

  const loadDocuments = useCallback(async (collectionName: string) => {
    if (!collectionName) {
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch(
        `${apiBaseUrl}/api/db/collections/${encodeURIComponent(collectionName)}/documents`,
        { headers: authHeaders },
      );
      const payload = (await response.json()) as { ok: boolean; message?: string; documents?: RawDocument[] };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setDocuments(payload.documents ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load documents.");
      setDocuments(null);
    } finally {
      setIsLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    void loadCollections();
  }, [loadCollections]);

  useEffect(() => {
    if (activeCollection) {
      setSearchText("");
      setDebouncedSearchText("");
      setFieldFilters({});
      void loadDocuments(activeCollection);
    }
  }, [activeCollection, loadDocuments]);

  // Delay applying the search text so fast typing doesn't re-filter 1000+ documents on every keystroke.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearchText(searchText), 200);
    return () => window.clearTimeout(timeoutId);
  }, [searchText]);

  // Auto-detect simple, low-cardinality fields (e.g. track, level, status) to offer as dropdown filters.
  const filterableFields = useMemo(() => {
    if (!documents || documents.length === 0) {
      return [] as Array<{ field: string; options: string[] }>;
    }

    const valuesByField = new Map<string, Set<string>>();

    for (const document of documents) {
      for (const [key, value] of Object.entries(document)) {
        if (key === "_id" || key === "body") {
          continue;
        }

        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
          continue;
        }

        const values = valuesByField.get(key) ?? new Set<string>();
        values.add(String(value));
        valuesByField.set(key, values);
      }
    }

    return Array.from(valuesByField.entries())
      .filter(([, values]) => values.size > 1 && values.size <= 30)
      .map(([field, values]) => ({ field, options: Array.from(values).sort() }))
      .sort((left, right) => left.field.localeCompare(right.field));
  }, [documents]);

  // Precomputed once per document load so the search filter doesn't re-stringify every document on each keystroke.
  const searchableText = useMemo(
    () => (documents ?? []).map((document) => JSON.stringify(document).toLowerCase()),
    [documents],
  );

  const filteredDocuments = useMemo(() => {
    if (!documents) {
      return null;
    }

    const normalizedSearch = debouncedSearchText.trim().toLowerCase();
    const activeFieldFilters = Object.entries(fieldFilters).filter(([, value]) => value !== "");

    return documents.filter((document, index) => {
      if (normalizedSearch && !searchableText[index]?.includes(normalizedSearch)) {
        return false;
      }

      return activeFieldFilters.every(([field, value]) => String(document[field] ?? "") === value);
    });
  }, [documents, searchableText, debouncedSearchText, fieldFilters]);

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearchText("");
    setFieldFilters({});
  };

  const handleExportCollection = () => {
    if (!documents) {
      return;
    }

    downloadTextFile(`${activeCollection}.json`, JSON.stringify(documents, null, 2), "application/json;charset=utf-8");
  };

  const handleExportDocument = (document: RawDocument) => {
    const id = getDocumentId(document) || "document";
    downloadTextFile(`${activeCollection}-${id}.json`, JSON.stringify(document, null, 2), "application/json;charset=utf-8");
  };

  const startEditing = (document: RawDocument) => {
    setEditingId(getDocumentId(document));
    setEditingText(JSON.stringify(document, null, 2));
    setStatusMessage("");
    setErrorMessage("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleSaveEdit = async () => {
    if (!editingId) {
      return;
    }

    try {
      const parsed = JSON.parse(editingText);
      const response = await fetch(
        `${apiBaseUrl}/api/db/collections/${encodeURIComponent(activeCollection)}/documents/${encodeURIComponent(editingId)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders },
          body: JSON.stringify(parsed),
        },
      );
      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setStatusMessage("Document updated.");
      setEditingId(null);
      setEditingText("");
      await loadDocuments(activeCollection);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save document. Check the JSON syntax.");
    }
  };

  const handleDelete = async (document: RawDocument) => {
    const id = getDocumentId(document);

    if (!id) {
      return;
    }

    if (!window.confirm("Delete this document permanently? This cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/db/collections/${encodeURIComponent(activeCollection)}/documents/${encodeURIComponent(id)}`,
        { method: "DELETE", headers: authHeaders },
      );
      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setStatusMessage("Document deleted.");
      await loadDocuments(activeCollection);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete document.");
    }
  };

  const handleImportFile = async (file: File) => {
    try {
      const rawContent = await file.text();
      const parsed: unknown = JSON.parse(rawContent);
      const documentsToImport = Array.isArray(parsed) ? parsed : [parsed];

      const response = await fetch(
        `${apiBaseUrl}/api/db/collections/${encodeURIComponent(activeCollection)}/documents/import`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders },
          body: JSON.stringify({ documents: documentsToImport }),
        },
      );
      const payload = (await response.json()) as { ok: boolean; message?: string; inserted?: number; updated?: number };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setStatusMessage(`Imported ${file.name}: ${payload.inserted ?? 0} inserted, ${payload.updated ?? 0} updated.`);
      await loadDocuments(activeCollection);
      await loadCollections();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to import file.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f0fdf4,#fff7ed_42%,#eff6ff)] px-3 py-4 text-slate-900 sm:px-4 sm:py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1600px] space-y-4">
        <header className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">Admin Studio</p>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">Database Explorer</h1>
              <p className="mt-2 text-sm text-slate-700">
                Browse exact MongoDB data across every collection. View, edit, delete, import, and export documents directly.
              </p>
            </div>
            <Link
              to="/admin"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
            >
              Back to Content Editor
            </Link>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3">
          <label className="text-sm font-semibold text-slate-700" htmlFor="db-collection-selector">
            Collection
          </label>
          <select
            id="db-collection-selector"
            value={activeCollection}
            onChange={(event) => setActiveCollection(event.target.value)}
            disabled={collections === null}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 disabled:opacity-50"
          >
            {collections === null ? (
              <option>Loading collections...</option>
            ) : (
              collections.map((collection) => (
                <option key={collection.name} value={collection.name}>
                  {collection.name} ({collection.count})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3">
          <p className="text-sm font-semibold text-slate-700">
            {activeCollection ? `${activeCollection}: ${filteredDocuments?.length ?? 0} of ${documents?.length ?? 0} document(s)` : "Select a collection"}
          </p>

          <button
            type="button"
            onClick={handleExportCollection}
            disabled={!documents}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export Collection
          </button>

          <label className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Import JSON
            <input
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) {
                  void handleImportFile(file);
                }
              }}
            />
          </label>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="db-search-input">
              Search
              <input
                id="db-search-input"
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search any field or value..."
                className="w-64 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
              />
            </label>

            {filterableFields.map(({ field, options }) => (
              <label key={field} className="grid gap-1 text-sm font-semibold text-slate-700">
                {field}
                <select
                  value={fieldFilters[field] ?? ""}
                  onChange={(event) =>
                    setFieldFilters((current) => ({ ...current, [field]: event.target.value }))
                  }
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                >
                  <option value="">All</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            {(searchText || Object.values(fieldFilters).some(Boolean)) ? (
              <button
                type="button"
                onClick={handleClearFilters}
                className="self-end rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        </div>

        {statusMessage ? <p className="text-sm font-semibold text-emerald-700">{statusMessage}</p> : null}
        {errorMessage ? <p className="text-sm font-semibold text-rose-700">{errorMessage}</p> : null}

        <div className="space-y-3">
          {isLoading ? (
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Spinner className="h-4 w-4 border-2 border-slate-300 border-t-emerald-600" />
              Loading documents...
            </p>
          ) : null}

          {!isLoading && filteredDocuments?.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-600">
              {documents && documents.length > 0 ? "No documents match the current filters." : "This collection has no documents."}
            </p>
          ) : null}

          {filteredDocuments?.map((document) => {
            const id = getDocumentId(document);
            const isEditing = editingId === id;

            return (
              <div key={id || Math.random()} className="rounded-2xl border border-slate-200 bg-white/90 p-3 sm:p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-xs text-slate-500">_id: {id}</p>
                  <div className="flex flex-wrap gap-2">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => void handleSaveEdit()}
                          className="rounded-lg border border-emerald-500 bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEditing(document)}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExportDocument(document)}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50"
                        >
                          Export
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(document)}
                          className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    className="min-h-60 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-800 outline-none focus:border-emerald-500"
                  />
                ) : (
                  <pre className="max-h-80 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
                    {JSON.stringify(document, null, 2)}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
