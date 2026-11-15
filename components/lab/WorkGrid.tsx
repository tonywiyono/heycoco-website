"use client";

import { useMemo, useState } from "react";
import type { Work } from "@/content/works";
import { Reveal, Segmented } from "./LabClient";
import { WorkCard, categoryLabel } from "./LabShared";

/** Work index with category pills (only categories that actually have works). */
export function WorkGrid({ works, initial = "all" }: { works: Work[]; initial?: string }) {
  const cats = useMemo(() => [...new Set(works.map((w) => w.category))], [works]);
  const [active, setActive] = useState(cats.includes(initial) ? initial : "all");
  const shown = active === "all" ? works : works.filter((w) => w.category === active);

  return (
    <>
      <Segmented
        label="Filter work"
        value={active}
        onChange={setActive}
        options={[
          { id: "all", label: `All (${works.length})` },
          ...cats.map((c) => ({ id: c, label: `${categoryLabel[c] ?? c} (${works.filter((w) => w.category === c).length})` })),
        ]}
      />
      <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w, i) => (
          <Reveal key={w.slug} delay={(i % 3) * 70}>
            <WorkCard work={w} priority={i < 3} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
