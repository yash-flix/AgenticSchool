import Image from "next/image";
import {
  fieldMinutes,
  fieldTrack,
  fmtDuration,
  playlistName,
  playlistUrl,
  thumb,
  watchUrl,
} from "@/lib/courses";
import Reveal from "./Reveal";

export default function FieldTrack() {
  const hours = Math.round(fieldMinutes / 60);

  return (
    <section
      id="field"
      className="scroll-mt-20 border-t border-line bg-panel/45 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="label">Field track</span>
              <span className="rounded-full border border-moss/40 bg-moss/8 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-moss uppercase">
                Free resource
              </span>
            </div>
            <h2 className="mt-4 max-w-[18ch] text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-[46px]">
              Watch working engineers do it
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:col-start-8">
            <p className="text-[16px] leading-[1.6] text-ink-2">
              The course path teaches you to build agents. This track shows you
              people already living with them: principal engineers, founders,
              and the teams shipping agentic workflows in production. Pulled
              from the{" "}
              <a
                href={playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-flame"
              >
                {playlistName}
              </a>{" "}
              playlist.
            </p>
            <div className="mt-6 flex items-center gap-4 rule-x pt-5">
              <span className="label">{fieldTrack.length} sessions</span>
              <span className="label">{hours} hours</span>
              <span className="label text-moss">No sign-up</span>
            </div>
          </Reveal>
        </div>

        <ol className="mt-14 overflow-hidden rounded-xl border border-line bg-canvas">
          {fieldTrack.map((v, i) => (
            <li key={v.videoId} className="border-b border-line last:border-b-0">
              <a
                href={watchUrl(v.videoId)}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[38px_1fr] items-center gap-x-4 gap-y-2 px-4 py-3.5 transition-colors hover:bg-panel/70 sm:grid-cols-[38px_108px_minmax(0,1fr)_auto] sm:px-5"
              >
                <span className="font-mono text-[11px] text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative hidden aspect-video w-[108px] overflow-hidden rounded-md border border-line bg-panel sm:block">
                  <Image
                    src={thumb(v.videoId)}
                    alt=""
                    fill
                    sizes="108px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>

                <span className="min-w-0">
                  <span className="block line-clamp-2 text-[15.5px] leading-[1.35] font-medium tracking-[-0.015em] text-ink">
                    {v.title}
                  </span>
                  <span className="mt-1 flex items-center gap-2.5">
                    <span className="text-[13px] text-muted">{v.channel}</span>
                    <span className="h-3 w-px bg-line" />
                    <span className="font-mono text-[10.5px] tracking-wider text-muted uppercase">
                      {v.tag}
                    </span>
                  </span>
                </span>

                <span className="col-start-2 flex items-center gap-4 sm:col-start-4">
                  <span className="font-mono text-[11px] text-muted tabular-nums">
                    {fmtDuration(v.minutes)}
                  </span>
                  <span className="hidden text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink sm:block">
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={playlistUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line-2 px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-panel"
          >
            Open the full playlist
          </a>
          <span className="text-[13px] text-muted">
            Free to watch, hosted on YouTube by the original creators.
          </span>
        </div>
      </div>
    </section>
  );
}
