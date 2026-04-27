// Dashboard overview page
// When navigating here from /dashboard/analytics, only this component re-renders
// The sidebar layout persists (no flicker, state preserved)

import { fetchPosts, fetchStats, fetchUser } from "@/app/data-demo/data";

 
async function fetchDashboardData() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchStats(),
  ]);
 
  // Extract successful results, provide fallbacks for failures
  const user = results[0].status === "fulfilled"
    ? results[0].value
    : { name: "Guest", email: "" };
 
  const posts = results[1].status === "fulfilled"
    ? results[1].value
    : [];
 
  const stats = results[2].status === "fulfilled"
    ? results[2].value
    : { views: 0, likes: 0 };
 
  // Log failures for monitoring (add biome-ignore if using console.log)
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      // biome-ignore lint/suspicious/noConsole: monitoring
      console.error(`Fetch ${index} failed:`, result.reason);
    }
  });
 
  return { user, posts, stats };
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-4 font-bold text-3xl">Dashboard Overview</h1>
      <p className="mb-6 text-gray-600">
        Welcome to your dashboard. Navigate between pages using the sidebar.
        Notice how the sidebar persists across route changes.
      </p>
 
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-800">Users</h3>
          <p className="font-bold text-2xl text-blue-600">1,234</p>
        </div>
        <div className="rounded-lg border bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">Revenue</h3>
          <p className="font-bold text-2xl text-green-600">$45,678</p>
        </div>
        <div className="rounded-lg border bg-purple-50 p-4">
          <h3 className="font-semibold text-purple-800">Orders</h3>
          <p className="font-bold text-2xl text-purple-600">567</p>
        </div>
      </div>
    </div>
  );
}