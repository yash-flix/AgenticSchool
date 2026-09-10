import Image from "next/image";
import { thumb, watchUrl } from "@/lib/courses";
import { groupByCategory, listPublishedCurated } from "@/lib/curated";
import { VIDEO_CATEGORIES } from "@/lib/youtube";
import AccentText from "./AccentText";
import Reveal from "./Reveal";

/**
 * Renders nothing at all until something is curated, so an empty admin does
 * not leave a hollow section on the home page.
 */
export default async function Curated() {
  const videos = await listPublishedCurated();
  if (videos.length === 0) return null;

  const grouped = groupByCategory(videos);
  // Known categories first, in their declared order; anything else after.
  const order = [
    ...VIDEO_CATEGORIES.filter((c) => grouped.has(c)),
    ...[...grouped.keys()].filter(
      (c) => !VIDEO_CATEGORIES.includes(c as (typeof VIDEO_CATEGORIES)[number])
    ),
  ];

  return (
    <section
      id="picks"
      className="scroll-mt-24 border-t border-line px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <span className="label">Recent picks</span>
          <h2 className="display-2 mt-5 max-w-[16ch]">
            <AccentText>{"Worth watching *this week*"}</AccentText>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-14">
          {order.map((category) => {
            const list = grouped.get(category) ?? [];
            return (
              <div key={category}>
                <div className="flex items-center gap-4 border-t border-ink pt-4">
                  <span className="label text-ink">{category}</span>
                  <span className="rule-x h-px flex-1" />
                  <span className="label">
                    {list.length} video{list.length === 1 ? "" : "s"}
                  </span>
                </div>

                <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((v, i) => (
                    <Reveal key={v.id} delay={i * 60}>
                      <li className="card h-full overflow-hidden p-0">
                        <a
                          href={watchUrl(v.videoId)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-full flex-col"
                        >
                          <span className="relative block aspect-video overflow-hidden bg-panel">
                            <Image
                              src={thumb(v.videoId)}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                              className="object-cover"
                            />
                          </span>

                          <span className="flex flex-1 flex-col p-5">
                            <span className="text-[15.5px] leading-[1.4] font-medium tracking-[-0.02em]">
                              {v.title}
                            </span>
                            {v.note && (
                              <span className="mt-2.5 text-[13.5px] leading-[1.55] text-ink-2">
                                {v.note}
                              </span>
                            )}
                            <span className="rule-x mt-auto pt-4 font-mono text-[9.5px] tracking-[0.15em] text-muted uppercase">
                              <span className="bg-paper pr-2">
                                {v.channel ?? "YouTube"}
                              </span>
                            </span>
                          </span>
                        </a>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
