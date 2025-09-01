import Link from "next/link";

export default function notFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
      <p className="mt-3 text-lg text-gray-600">
        We couldn’t find the page you’re looking for.
      </p>

      <Link
        href="/"
        className="mt-6 bg-indigo-600 text-white px-6 py-1 rounded-lg shadow hover:bg-indigo-700 transition">
        Return Home
      </Link>
    </div>
  );
}
