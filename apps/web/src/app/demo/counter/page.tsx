// No 'use client' - this is a Server Component by default
// Data fetching and heavy logic stays here on the server
 
import { Suspense } from 'react'
import { connection } from 'next/server'
import { Counter } from '@/components/counter'
 
// Async component that accesses request-time data
async function ServerTimestamp() {
  await connection() // Required before using new Date() in Server Components
  const serverTimestamp = new Date().toISOString()
  return (
    <section className="rounded-lg border bg-muted/50 p-6">
      <h2 className="font-semibold text-lg">Server-Rendered Content</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Generated at: <code className="font-mono text-xs">{serverTimestamp}</code>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        This content ships as HTML with zero JavaScript.
      </p>
    </section>
  )
}
 
export default function CounterDemoPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="font-bold text-3xl">Server/Client Boundary Demo</h1>
        <p className="mt-2 text-muted-foreground">
          This page is a Server Component. The counter below is a Client Component.
        </p>
      </div>
 
      {/* Server-rendered content (no JS) */}
      <Suspense
        fallback={
          <section className="rounded-lg border bg-muted/50 p-6 animate-pulse">
            <h2 className="font-semibold text-lg">Server-Rendered Content</h2>
            <p className="mt-2 text-sm text-muted-foreground">Loading timestamp...</p>
          </section>
        }
      >
        <ServerTimestamp />
      </Suspense>
 
      {/* Client Component - interactive widget */}
      <section className="rounded-lg border bg-muted/50 p-6">
        <h2 className="font-semibold text-lg">Client Component (Interactive)</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Only this counter component ships JavaScript to the browser.
        </p>
        <Counter initialCount={0} />
      </section>
 
      {/* Decision documentation */}
      <section className="rounded-lg border bg-muted/50 p-6">
        <h2 className="font-semibold text-lg">Decision Rationale</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>
            <strong>Page (Server):</strong> Fetches data, renders static content, no interactivity needed
          </li>
          <li>
            <strong>Counter (Client):</strong> Uses useState hook, handles onClick events
          </li>
        </ul>
      </section>
    </main>
  )
}


