import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col antialiased">
      <Outlet />

      <footer className="px-4 py-8">
        <p className="text-xs text-center text-zinc-500">
          <Link
            to="/sign-up"
            className="underline text-gray-500 hover:text-gray-700"
          >
            Create account
          </Link>
        </p>
      </footer>
    </div>
  );
}
