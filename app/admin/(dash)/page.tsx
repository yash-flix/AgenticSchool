import { metrics } from "@/lib/crm";
import StatPanel from "@/components/admin/StatPanel";
import SignupTrend from "@/components/admin/SignupTrend";
import CourseFunnel from "@/components/admin/CourseFunnel";

export default async function Overview() {
  const m = await metrics();

  const tiles = [
    { k: "Members", v: String(m.users), note: `${m.admins} admin${m.admins === 1 ? "" : "s"}` },
    { k: "Started the path", v: String(m.withProgress), note: `${pct(m.withProgress, m.users)} of members` },
    { k: "Courses completed", v: String(m.completions), note: `${m.avgCompleted} avg per active member` },
    { k: "Projects posted", v: String(m.projects), note: `${m.finished} finished the path` },
  ];

  return (
    <>
      <header>
        <span className="label">Overview</span>
        <h1 className="display-3 mt-3">How the school is doing</h1>
      </header>

      <div className="mt-8">
        <StatPanel tiles={tiles} />
      </div>

      {m.users === 0 ? (
        <div className="card mt-6 grid place-items-center px-6 py-16 text-center hover:translate-y-0">
          <span className="ghost-num text-[56px]">00</span>
          <p className="display-4 mt-5">No members yet</p>
          <p className="mt-2.5 max-w-[44ch] text-[14px] leading-[1.6] text-ink-2">
            Numbers appear here as soon as the first person signs in. Everything
            on this page reads live from the database.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SignupTrend days={m.signupsByDay} />
          <CourseFunnel rows={m.perCourse} members={m.withProgress} />
        </div>
      )}
    </>
  );
}

function pct(part: number, whole: number) {
  return whole ? `${Math.round((part / whole) * 100)}%` : "0%";
}
