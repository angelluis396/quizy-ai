import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateQuestions } from "@/lib/claude";
import { NextResponse } from "next/server";
import { z } from "zod";

const quizSchema = z.object({
  topic: z.string().min(1),
  amount: z.number().min(5).max(10),
  type: z.enum(["mcq", "true_false"]),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { topic, amount, type } = quizSchema.parse(body);

    const questions = await generateQuestions(topic, amount, type);

    const quiz = await prisma.quiz.create({
      data: {
        userId: session.user.id,
        topic,
        type,
        questions: {
          create: questions.map((q) => ({
            question: q.question,
            options: q.options,
            answer: q.answer,
          })),
        },
      },
    });

    return NextResponse.json({ quizId: quiz.id }, { status: 201 });
  } catch (error) {
    console.error("Quiz creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
  }
}