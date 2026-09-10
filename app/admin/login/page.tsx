import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin — Agent School", robots: { index: false } };

export default function AdminLogin() {
  return (
    <main className="grid min-h-dvh place-items-center bg-panel/40 px-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
