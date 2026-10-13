const AUTH_STORAGE_KEY = "tutorial-platform-auth";

export function getAuthHeaders(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    const token = raw ? (JSON.parse(raw) as { token?: string }).token : undefined;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}
