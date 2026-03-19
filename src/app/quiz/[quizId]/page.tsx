import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import QuizPlayer from "@/components/QuizPlayer";

type Props = { params: Promise<{ quizId: string }> };

export default async function QuizPage({ params }: Props) {
  const { quizId } = await params;
  const session = await getAuthSession();
  if (!session?.user) redirect("/");

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });

  if (!quiz || quiz.userId !== session.user.id) redirect("/dashboard");

  return <QuizPlayer quiz={quiz} questions={quiz.questions} />;
}
