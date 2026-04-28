import { Suspense } from "react";
import { redirect, notFound } from "next/navigation";
 
async function fetchUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}
 
interface PageProps {
  params: Promise<{ id: string }>;
}
 
async function UserContent({ params }: PageProps) {
  const { id } = await params;
  const user = await fetchUser(id);
 
  // Redirect to login if user not found (auth scenario)
  if (!user) {
    redirect("/login");
  }
 
  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">{user.name}</h1>
      <p>{user.email}</p>
    </>
  );
}
 
export default function UserPage({ params }: PageProps) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <Suspense fallback={<div className="animate-pulse">Loading user...</div>}>
        <UserContent params={params} />
      </Suspense>
    </main>
  );
}