import React from "react";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/forms/QuizCreation";

export const metadata = {
  title: "Quiz | Quizy AI",
  description: "Quiz yourself on any topic!",
};

interface Props {
  searchParams: Promise<{ // Note: Type updated to reflect Promise
    topic?: string;
  }>;
}

const QuizPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams; // Await the Promise
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return <QuizCreation topic={resolvedSearchParams.topic ?? ""} />;
};

export default QuizPage;