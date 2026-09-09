import type { Metadata } from "next";
import CommunityWall from "@/components/CommunityWall";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import {
  buildUrl,
  categoryUrl,
  referenceBuilds,
  referenceRepo,
  referenceTotal,
} from "@/lib/community";
import { projectStore } from "@/lib/projectStore";

export const metadata: Metadata = {
  title: "Community — Agent School",
  description:
    "Reference agent builds worth copying, and a wall where people working through the path list what they shipped.",
};

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const projects = await projectStore.list();

  return (
    <>
      <Nav />
      <main>
        {/* ------------------------------------------------ hero -- */}
        <section className="relative overflow-hidden px-6 pt-14 pb-16 md:pt-20">
          <div
            aria-hidden
            className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
          />
          <div className="relative mx-auto max-w-[1200px]">
            <Reveal>
              <span className="label">Community</span>
              <h1 className="display-1 mt-6 max-w-[14ch]">
                Read the code. <span className="em-serif">Then ship yours.</span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede mt-9 max-w-[54ch]">
                Courses end. Projects are what actually move you forward. This
                page holds two things: a library of working agent
                implementations worth reading, and a wall for what you build
                after the path.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- reference -- */}
        <section
          id="reference"
          className="scroll-mt-24 border-t border-line bg-panel/45 px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
              <Reveal className="md:col-span-6">
                <span className="label">Reference library</span>
                <h2 className="display-2 mt-5 max-w-[16ch]">
                  {referenceTotal} builds you can{" "}
                  <span className="em-serif">read today</span>
                </h2>
                <p className="lede mt-6 max-w-[46ch]">
                  Every course teaches one shape of agent. This repository shows
                  dozens, in code, with setup instructions. Treat it as the
                  worked-answers section: build it yourself first, then read how
                  someone else did it.
                </p>
              </Reveal>

              <Reveal delay={90} className="md:col-span-5 md:col-start-8">
                <a
                  href={referenceRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card block overflow-hidden bg-obsidian p-7 text-canvas hover:border-line-dark"
                >
                  <div className="flex items-start gap-4">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-0.5 h-6 w-6 shrink-0 fill-canvas"
                      aria-hidden
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38l-.01-1.49C3.8 14.18 3.33 13 3.33 13c-.36-.93-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <div className="min-w-0">
                      <p className="font-mono text-[11.5px] tracking-[0.04em] text-white/55">
                        {referenceRepo.owner}/
                      </p>
                      <p className="text-[19px] leading-tight font-medium tracking-[-0.025em]">
                        Hands-On-AI-Engineering
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[14px] leading-[1.6] text-white/62">
                    {referenceRepo.description}
                  </p>

                  <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line-dark pt-5">
                    {[
                      { k: "Stars", v: referenceRepo.stars.toLocaleString() },
                      { k: "Forks", v: referenceRepo.forks.toLocaleString() },
                      { k: "Language", v: referenceRepo.language },
                    ].map((s) => (
                      <div key={s.k}>
                        <dt className="font-mono text-[9.5px] tracking-[0.15em] text-white/40 uppercase">
                          {s.k}
                        </dt>
                        <dd className="mt-2 text-[17px] font-medium tracking-[-0.025em] tabular-nums">
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 font-mono text-[9.5px] tracking-[0.15em] text-white/35 uppercase">
                    Counts read {referenceRepo.readAt} · opens on GitHub ↗
                  </p>
                </a>
              </Reveal>
            </div>

            {/* categories */}
            <Reveal delay={60}>
              <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
                {referenceRepo.categories.map((c) => (
                  <a
                    key={c.path}
                    href={categoryUrl(c.path)}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-paper px-5 py-6 transition-colors hover:bg-panel"
                  >
                    <span className="text-[28px] leading-none font-medium tracking-[-0.04em] tabular-nums">
                      {c.count}
                    </span>
                    <span className="mt-2.5 block text-[13.5px] text-ink-2 transition-colors group-hover:text-ink">
                      {c.name}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* picks */}
            <div className="mt-16">
              <div className="flex items-center gap-4 border-t border-ink pt-4">
                <span className="label text-ink">Nine worth starting with</span>
                <span className="rule-x h-px flex-1" />
                <span className="label">mapped to the path</span>
              </div>

              <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {referenceBuilds.map((b, i) => (
                  <Reveal key={b.dir} delay={i * 55}>
                    <li className="card flex h-full flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className="label text-ink">{b.stage}</span>
                      </div>
                      <h3 className="display-4 mt-3.5">{b.title}</h3>
                      <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-2">
                        {b.blurb}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {b.stack.map((s) => (
                          <span key={s} className="chip">
                            {s}
                          </span>
                        ))}
                      </div>
                      <a
                        href={buildUrl(b)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] text-muted transition-colors hover:text-ink"
                      >
                        <span className="truncate">
                          {b.path}/{b.dir}
                        </span>
                        <span aria-hidden className="ml-auto">
                          ↗
                        </span>
                      </a>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={referenceRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  Browse all {referenceTotal} builds ↗
                </a>
                <span className="text-[13px] text-muted">
                  Maintained by {referenceRepo.owner}. Not affiliated with Agent
                  School.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ wall -- */}
        <section
          id="wall"
          className="scroll-mt-24 border-t border-line px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-[1200px]">
            <CommunityWall initialProjects={projects} persisted={false} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
