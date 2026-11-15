/**
 * Optional, real results per work, shown on the case page only when present.
 * Add entries when you have verified numbers, e.g.
 *   "beluga-coffee": { brief: "…", results: [{ value: "+40%", label: "profile visits" }] }
 */
export type WorkResult = {
  brief?: string;
  results?: { value: string; label: string }[];
};

export const workResults: Record<string, WorkResult> = {};
