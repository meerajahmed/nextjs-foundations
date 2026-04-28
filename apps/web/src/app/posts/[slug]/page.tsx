// Demonstrates notFound() routing to the nearest not-found.tsx
 
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
 
// Simulated posts database
const posts: Record<string, { title: string; content: string }> = {
  "hello-world": {
    title: "Hello World",
    content: "This is the first post. Welcome to the blog!",
  },
  "nextjs-tips": {
    title: "Next.js Tips",
    content: "Here are some tips for building with Next.js...",
  },
};
 
// Extracted component to handle the dynamic params promise
async function PostContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const post = posts[params.slug];
 
  // If post doesn't exist, trigger 404
  // notFound() throws - don't wrap in try/catch or it won't work
  if (!post) {
    notFound();
  }
 
  return (
    <>
      <h1 className="mb-4 font-bold text-3xl">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
    </>
  );
}
 
// Main page renders the static shell and streams the dynamic content
export default function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link
        href="/posts"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        ← Back to posts
      </Link>
      
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-2/3 rounded bg-gray-200"></div>
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>
        }
      >
        <PostContent paramsPromise={props.params} />
      </Suspense>
    </main>
  );
}