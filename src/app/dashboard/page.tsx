import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";

export default async function Dashboard() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/");

  const quizzes = await prisma.quiz.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { questions: true },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {session.user.name}!</p>
        </div>

        {/* App explainer + Quiz Me CTA */}
        <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 mb-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">What is Quizy AI?</h2>
          <p className="text-indigo-100 mb-6 leading-relaxed">
            Quizy AI uses artificial intelligence to generate custom quizzes on any topic you choose.
            Pick a topic, choose how many questions you want, select multiple choice or true/false,
            and let AI do the rest. Test your knowledge and track your scores over time!
          </p>
          <Link
            href="/quiz/new"
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Quiz Me 🎯
          </Link>
        </div>

        {/* Previous quizzes */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Quizzes</h2>
        {quizzes.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <p className="text-xl">No quizzes yet!</p>
            <p className="mt-2">Hit <strong>Quiz Me</strong> to create your first one.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}