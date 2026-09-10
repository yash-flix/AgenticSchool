import UsersTable from "@/components/admin/UsersTable";
import { courses } from "@/lib/courses";
import { listUsers } from "@/lib/crm";

export default async function UsersPage() {
  const users = await listUsers();

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="label">Members</span>
          <h1 className="display-3 mt-3">Everyone who signed in</h1>
        </div>
        <a href="/api/admin/users/export" className="btn btn-ghost btn-sm" download>
          Export CSV
        </a>
      </header>

      <div className="mt-8">
        <UsersTable users={users} totalCourses={courses.length} />
      </div>
    </>
  );
}
