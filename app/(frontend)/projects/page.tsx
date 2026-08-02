import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import { getAllProjects } from "@/lib/cms";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Hey Coco!",
  description:
    "Selected work from Hey Coco! — brand, social media, content creation, and video production projects.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="pb-16">
      <SectionPanel>
        <Link
          href="/#projects"
          className="mb-8 inline-flex text-sm text-black/50 transition-colors hover:text-text-dark"
        >
          ← Back home
        </Link>

        <SectionHead
          title="Projects"
          description="Business challenges are tough, but we have a proven record of elevating our partners to their next and best selves."
        />

        {projects.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    {project.category}
                  </span>

                  <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold leading-tight text-white sm:text-2xl">
                    {project.title}
                  </h2>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-black/75">
                    {project.description}
                  </p>

                  {project.scope.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.scope.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-accent/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-accent"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-text-dark transition-colors group-hover:text-accent">
                    Read case
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-black/60">No projects yet. Check back soon.</p>
        )}
      </SectionPanel>
    </div>
  );
}
