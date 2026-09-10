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
import AccentText from "./AccentText";
import FieldShape from "./FieldShape";
import Reveal from "./Reveal";

export default function FieldTrack() {
  const hours = Math.round(fieldMinutes / 60);

  return (
    <section
      id="field"
      className="scroll-mt-24 border-t border-line bg-panel/45 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="label">Field track</span>
              <span className="chip chip-free">Free resource</span>
            </div>
            <h2 className="display-2 mt-5 max-w-[15ch]">
              <AccentText>{"Watch *working engineers* do it"}</AccentText>
            </h2>
            <FieldShape />
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:col-start-8">
            <p className="lede">
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

        <ol className="card mt-14 overflow-hidden p-0 hover:translate-y-0 hover:shadow-[var(--shadow-card)]">
          {fieldTrack.map((v, i) => (
            <li key={v.videoId} className="border-b border-line last:border-b-0">
              <a
                href={watchUrl(v.videoId)}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[34px_1fr] items-center gap-x-5 gap-y-2 px-4 py-4 transition-colors hover:bg-panel/60 sm:grid-cols-[34px_116px_minmax(0,1fr)_auto] sm:px-6"
              >
                <span className="font-mono text-[11px] text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative hidden aspect-video w-[116px] overflow-hidden rounded-lg border border-line bg-panel sm:block">
                  <Image
                    src={thumb(v.videoId)}
                    alt=""
                    fill
                    sizes="116px"
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
            className="btn btn-ghost"
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
