// Server-side redirect for authentication
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
 
async function ProtectedContent() {
  const session = await getSession();
 
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
 
  return <p>Welcome, {session.user.name}!</p>;
}
 
export default function ProtectedPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 font-bold text-2xl">Protected Content</h1>
      <Suspense fallback={<p>Checking authentication...</p>}>
        <ProtectedContent />
      </Suspense>
    </main>
  );
}