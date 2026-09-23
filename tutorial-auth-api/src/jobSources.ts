// Single place to register job portals: add a new entry to JOB_SOURCES to wire up another portal.

export type JobExperienceLevel = "fresher" | "junior" | "mid" | "senior";

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string | null;
  source: string;
  applyUrl: string;
  description: string;
  experienceLevel: JobExperienceLevel;
  salary: string | null;
  remote: boolean;
};

export type JobSourceInfo = {
  id: string;
  name: string;
  homepageUrl: string;
  requiresApiKey: boolean;
};

export type JobSourceDefinition = JobSourceInfo & {
  isConfigured: () => boolean;
  fetchJobs: (query: string, location: string, page: number) => Promise<JobListing[]>;
};

export type JobSourceResult = {
  id: string;
  name: string;
  status: "ok" | "error" | "skipped";
  count: number;
  message?: string;
};


export function classifyExperienceLevel(title: string, description: string): JobExperienceLevel {
  const text = `${title} ${description}`.toLowerCase();

  if (/\b(intern|internship|fresher|graduate trainee|entry.level|no experience)\b/.test(text)) {
    return "fresher";
  }
  if (/\b(junior|jr\.?|associate)\b/.test(text)) {
    return "junior";
  }
  if (/\b(senior|sr\.?|lead|principal|staff|architect|manager|head of)\b/.test(text)) {
    return "senior";
  }
  return "mid";
}

const adzunaSource: JobSourceDefinition = {
  id: "adzuna",
  name: "Adzuna",
  homepageUrl: "https://www.adzuna.in",
  requiresApiKey: true,
  isConfigured: () =>
    Boolean(process.env.ADZUNA_APP_ID?.trim() && process.env.ADZUNA_APP_KEY?.trim()),
  fetchJobs: async (query, location, page) => {
    const appId = process.env.ADZUNA_APP_ID?.trim();
    const appKey = process.env.ADZUNA_APP_KEY?.trim();
    const country = process.env.ADZUNA_COUNTRY?.trim() || "in";

    if (!appId || !appKey) {
      return [];
    }

    const apiUrl = new URL(
      `https://api.adzuna.com/v1/api/jobs/${encodeURIComponent(country)}/search/${page}`,
    );
    apiUrl.searchParams.set("app_id", appId);
    apiUrl.searchParams.set("app_key", appKey);
    apiUrl.searchParams.set("results_per_page", "20");
    apiUrl.searchParams.set("content-type", "application/json");
    if (query) apiUrl.searchParams.set("what", query);
    if (location) apiUrl.searchParams.set("where", location);

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Adzuna API responded with ${response.status}.`);
    }

    const payload = (await response.json()) as {
      results?: Array<{
        id?: string;
        title?: string;
        company?: { display_name?: string };
        location?: { display_name?: string };
        created?: string;
        redirect_url?: string;
        description?: string;
        salary_min?: number;
        salary_max?: number;
      }>;
    };

    return (payload.results ?? []).map((item) => {
      const title = item.title ?? "Untitled role";
      const description = item.description ?? "";
      return {
        id: `adzuna-${item.id ?? crypto.randomUUID()}`,
        title,
        company: item.company?.display_name ?? "Unknown company",
        location: item.location?.display_name ?? (location || "Not specified"),
        postedAt: item.created ?? null,
        source: "adzuna",
        applyUrl: item.redirect_url ?? "https://www.adzuna.in",
        description,
        experienceLevel: classifyExperienceLevel(title, description),
        salary:
          item.salary_min && item.salary_max
            ? `${Math.round(item.salary_min).toLocaleString()} - ${Math.round(item.salary_max).toLocaleString()}`
            : null,
        remote: /\bremote\b/i.test(`${title} ${description}`),
      };
    });
  },
};

const arbeitnowSource: JobSourceDefinition = {
  id: "arbeitnow",
  name: "Arbeitnow",
  homepageUrl: "https://www.arbeitnow.com",
  requiresApiKey: false,
  isConfigured: () => true,
  fetchJobs: async (query, location) => {
    const response = await fetch("https://arbeitnow.com/api/job-board-api");
    if (!response.ok) {
      throw new Error(`Arbeitnow API responded with ${response.status}.`);
    }

    const payload = (await response.json()) as {
      data?: Array<{
        slug?: string;
        title?: string;
        company_name?: string;
        location?: string;
        created_at?: number;
        url?: string;
        description?: string;
        remote?: boolean;
      }>;
    };

    const queryLower = query.toLowerCase();
    const locationLower = location.toLowerCase();

    return (payload.data ?? [])
      .filter((item) => {
        const title = item.title ?? "";
        const description = item.description ?? "";
        const matchesQuery =
          !queryLower ||
          title.toLowerCase().includes(queryLower) ||
          description.toLowerCase().includes(queryLower);
        const matchesLocation =
          !locationLower || (item.location ?? "").toLowerCase().includes(locationLower);
        return matchesQuery && matchesLocation;
      })
      .slice(0, 30)
      .map((item) => {
        const title = item.title ?? "Untitled role";
        const description = item.description ?? "";
        return {
          id: `arbeitnow-${item.slug ?? crypto.randomUUID()}`,
          title,
          company: item.company_name ?? "Unknown company",
          location: item.location || "Remote",
          postedAt: item.created_at ? new Date(item.created_at * 1000).toISOString() : null,
          source: "arbeitnow",
          applyUrl: item.url ?? "https://arbeitnow.com",
          description,
          experienceLevel: classifyExperienceLevel(title, description),
          salary: null,
          remote: Boolean(item.remote),
        };
      });
  },
};

const remotiveSource: JobSourceDefinition = {
  id: "remotive",
  name: "Remotive",
  homepageUrl: "https://remotive.com",
  requiresApiKey: false,
  isConfigured: () => true,
  fetchJobs: async (query, location) => {
    const apiUrl = new URL("https://remotive.com/api/remote-jobs");
    if (query) apiUrl.searchParams.set("search", query);

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Remotive API responded with ${response.status}.`);
    }

    const payload = (await response.json()) as {
      jobs?: Array<{
        id?: number;
        title?: string;
        company_name?: string;
        candidate_required_location?: string;
        publication_date?: string;
        url?: string;
        description?: string;
        salary?: string;
      }>;
    };

    const locationLower = location.toLowerCase();

    return (payload.jobs ?? [])
      .filter((item) => {
        if (!locationLower) return true;
        const jobLocation = (item.candidate_required_location ?? "").toLowerCase();
        return jobLocation.includes(locationLower) || jobLocation.includes("worldwide") || jobLocation.includes("anywhere");
      })
      .slice(0, 30)
      .map((item) => {
        const title = item.title ?? "Untitled role";
        const description = item.description ?? "";
        return {
          id: `remotive-${item.id ?? crypto.randomUUID()}`,
          title,
          company: item.company_name ?? "Unknown company",
          location: item.candidate_required_location || "Remote",
          postedAt: item.publication_date ?? null,
          source: "remotive",
          applyUrl: item.url ?? "https://remotive.com",
          description,
          experienceLevel: classifyExperienceLevel(title, description),
          salary: item.salary?.trim() || null,
          remote: true,
        };
      });
  },
};

const jobicySource: JobSourceDefinition = {
  id: "jobicy",
  name: "Jobicy",
  homepageUrl: "https://jobicy.com",
  requiresApiKey: false,
  isConfigured: () => true,
  fetchJobs: async (query, location) => {
    const apiUrl = new URL("https://jobicy.com/api/v2/remote-jobs");
    apiUrl.searchParams.set("count", "50");

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Jobicy API responded with ${response.status}.`);
    }

    const payload = (await response.json()) as {
      jobs?: Array<{
        id?: number;
        jobTitle?: string;
        companyName?: string;
        jobGeo?: string;
        pubDate?: string;
        url?: string;
        jobDescription?: string;
        jobLevel?: string;
        annualSalaryMin?: number;
        annualSalaryMax?: number;
      }>;
    };

    const queryLower = query.toLowerCase();
    const locationLower = location.toLowerCase();

    return (payload.jobs ?? [])
      .filter((item) => {
        const title = item.jobTitle ?? "";
        const description = item.jobDescription ?? "";
        const matchesQuery =
          !queryLower ||
          title.toLowerCase().includes(queryLower) ||
          description.toLowerCase().includes(queryLower);
        const matchesLocation =
          !locationLower || (item.jobGeo ?? "").toLowerCase().includes(locationLower);
        return matchesQuery && matchesLocation;
      })
      .slice(0, 30)
      .map((item) => {
      const title = item.jobTitle ?? "Untitled role";
      const description = item.jobDescription ?? "";
      return {
        id: `jobicy-${item.id ?? crypto.randomUUID()}`,
        title,
        company: item.companyName ?? "Unknown company",
        location: item.jobGeo || "Remote",
        postedAt: item.pubDate ?? null,
        source: "jobicy",
        applyUrl: item.url ?? "https://jobicy.com",
        description,
        experienceLevel: classifyExperienceLevel(`${title} ${item.jobLevel ?? ""}`, description),
        salary:
          item.annualSalaryMin && item.annualSalaryMax
            ? `${item.annualSalaryMin.toLocaleString()} - ${item.annualSalaryMax.toLocaleString()}`
            : null,
        remote: true,
      };
    });
  },
};

export const JOB_SOURCES: JobSourceDefinition[] = [
  adzunaSource,
  arbeitnowSource,
  remotiveSource,
  jobicySource,
];
