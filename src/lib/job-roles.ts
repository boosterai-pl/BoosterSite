import type { JobRole } from "@/content/types";

export const EMPLOYMENT_TYPE_LABELS: Record<JobRole["employmentType"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};
