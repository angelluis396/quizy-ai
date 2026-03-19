import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Quizy AI 🔥</h1>
        <p className="text-gray-500 mb-8">
          Generate AI-powered quizzes on any topic. Sign in to get started!
        </p>
        <SignInButton />
      </div>
    </div>
  );
}
