"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Quiz, Question } from "@prisma/client";

type Props = {
  quiz: Quiz;
  questions: Question[];
};

export default function QuizPlayer({ quiz, questions }: Props) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const question = questions[current];
  const options = question.options as string[];

  const handleAnswer = async (option: string) => {
    if (selected || loading) return;
    setSelected(option);
    setLoading(true);

    const res = await fetch("/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: question.id, answer: option }),
    });
    const data = await res.json();
    setResult(data);
    if (data.isCorrect) setScore((s) => s + 1);
    setLoading(false);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setResult(null);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-start sm:items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 pt-25 sm:pt-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md text-center">
          <div className="text-6xl mb-4">{score >= questions.length * 0.7 ? "🎉" : "📚"}</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Topic: <span className="font-semibold">{quiz.topic}</span></p>
          <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-6 mb-6">
            <p className="text-5xl font-bold text-indigo-600">{score}/{questions.length}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((score / questions.length) * 100)}% correct
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 pt-25 sm:pt-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Question {current + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Score: {score}
          </span>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${(current / questions.length) * 100}%` }}
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{question.question}</h2>

        <div className="space-y-3">
          {options.map((option) => {
            // Only apply result colors AFTER result is back (fixes flash bug)
            let style = "border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-gray-800 dark:text-gray-200";
            if (result) {
              if (option === result.correctAnswer) {
                style = "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400";
              } else if (option === selected && !result.isCorrect) {
                style = "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400";
              } else {
                style = "border-gray-200 dark:border-gray-700 opacity-50 text-gray-800 dark:text-gray-200";
              }
            } else if (selected === option) {
              style = "border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {result && (
          <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${result.isCorrect ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"}`}>
            {result.isCorrect ? "✅ Correct!" : `❌ Incorrect. The answer was: ${result.correctAnswer}`}
          </div>
        )}

        {result && (
          <button
            onClick={handleNext}
            className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            {current + 1 >= questions.length ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}