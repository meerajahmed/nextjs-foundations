import { Suspense } from "react";
import { getUserDTO } from "@/lib/server/user-dto";
import { UserCard } from "@/components/user-card";

async function UserProfile() {
	const user = await getUserDTO("user-123");
	return <UserCard user={user} />;
}

export default function SecurityDemoPage() {
	return (
		<main className="flex flex-col gap-4 p-4">
			<h1 className="font-bold text-2xl">Security Demo</h1>
			<p className="text-gray-600">
				This page demonstrates secure data fetching patterns.
			</p>
			{/* Pass only the safe DTO to the Client Component */}
			<Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>}>
				<UserProfile />
			</Suspense>
		</main>
	);
}