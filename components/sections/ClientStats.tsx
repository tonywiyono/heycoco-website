import { LogoMarquee } from "@/components/ui/LogoMarquee";
import type { ClientLogo, ProcessStat } from "@/lib/types/content";

type ClientStatsProps = {
  clientLogos: ClientLogo[];
  processStats: ProcessStat[];
};

export function ClientStats({ clientLogos, processStats }: ClientStatsProps) {
  return (
    <div className="mb-4 overflow-hidden rounded-[var(--radius-card)] bg-accent px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <LogoMarquee logos={clientLogos} className="mb-8 sm:mb-10" />

      <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {processStats.map((stat) => (
          <div key={stat.value + stat.label} className="text-center sm:text-left">
            <p className="text-4xl font-bold leading-none sm:text-5xl">{stat.value}</p>
            <p className="mt-3 whitespace-pre-line text-xs uppercase leading-relaxed tracking-wide text-white/85 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
