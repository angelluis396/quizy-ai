import Link from "next/link";
import type { Quiz, Question } from "@prisma/client";

type Props = {
  quiz: Quiz & { questions: Question[] };
};

export default function QuizCard({ quiz }: Props) {
  const total = quiz.questions.length;
  const answered = quiz.questions.filter((q) => q.userAnswer !== null).length;
  const correct = quiz.questions.filter((q) => q.isCorrect).length;
  const completed = answered === total;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{quiz.topic}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {quiz.type === "mcq" ? "Multiple Choice" : "True / False"} · {total} questions
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {completed ? "Completed" : "In Progress"}
        </span>
      </div>

      {completed && (
        <p className="text-sm text-gray-600 mb-3">
          Score: <span className="font-semibold text-indigo-600">{correct}/{total}</span>
        </p>
      )}

      <Link
        href={`/quiz/${quiz.id}`}
        className="block text-center bg-indigo-50 text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-100 transition text-sm"
      >
        {completed ? "Review Quiz" : "Continue Quiz"}
      </Link>
    </div>
  );
}
