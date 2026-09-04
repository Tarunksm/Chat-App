import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        Chat App
      </h1>
      <p className="mt-4 max-w-md text-gray-500">
        A real-time chat application built with Next.js, WebSockets, PostgreSQL,
        and Better Auth.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/login"
          className="rounded-xl bg-black px-6 py-3 font-medium text-white transition
        hover:bg-gray-800"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-xl border border-gray-300 bg-white text-gray-900 px-6 py-3 font-medium transition hover:bg-gray-50"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
