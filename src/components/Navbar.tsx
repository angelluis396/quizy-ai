import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link href={session?.user ? "/dashboard" : "/"} className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        Quizy AI 🔥
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {session?.user ? <UserMenu user={session.user} /> : <SignInButton />}
      </div>
    </nav>
  );
}