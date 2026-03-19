"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewQuiz() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [amount, setAmount] = useState(5);
  const [type, setType] = useState<"mcq" | "true_false">("mcq");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, amount, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create quiz");
      router.push(`/quiz/${data.quizId}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 pt-20 sm:pt-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create a Quiz</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Provide a topic to be quizzed on</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic..."
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Questions</label>
            <div className="flex gap-3">
              {[5, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setAmount(n)}
                  className={`flex-1 py-2 rounded-lg font-semibold border transition ${
                    amount === n
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-indigo-400"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Type</label>
            <div className="flex gap-3">
              {[
                { value: "mcq", label: "Multiple Choice" },
                { value: "true_false", label: "True / False" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setType(opt.value as "mcq" | "true_false")}
                  className={`flex-1 py-2 rounded-lg font-semibold border transition ${
                    type === opt.value
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-indigo-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Generating questions..." : "Start Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}