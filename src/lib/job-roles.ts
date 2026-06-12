import type { JobRole } from "@/content/types";

export const EMPLOYMENT_TYPE_LABELS: Record<JobRole["employmentType"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};

export const EMPLOYMENT_TYPE_LABELS_PL: Record<JobRole["employmentType"], string> = {
  "full-time": "Pełny etat",
  "part-time": "Część etatu",
  "contract": "Kontrakt",
  "internship": "Staż",
};
