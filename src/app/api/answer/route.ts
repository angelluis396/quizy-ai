import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const answerSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { questionId, answer } = answerSchema.parse(body);

    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const isCorrect = question.answer === answer;

    await prisma.question.update({
      where: { id: questionId },
      data: { userAnswer: answer, isCorrect },
    });

    return NextResponse.json({ isCorrect, correctAnswer: question.answer });
  } catch (error) {
    console.error("Answer submission error:", error);
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}