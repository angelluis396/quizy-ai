import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export async function generateQuestions(
  topic: string,
  amount: number,
  type: "mcq" | "true_false"
): Promise<Question[]> {
  const typeInstructions =
    type === "true_false"
      ? `Generate ${amount} true/false questions. Each question's options must be exactly ["True", "False"] and the answer must be either "True" or "False".`
      : `Generate ${amount} multiple choice questions. Each question must have exactly 4 options (including the answer). The answer must exactly match one of the options.`;

  const prompt = `You are a quiz generator. ${typeInstructions}
Topic: ${topic}

Respond with ONLY a valid JSON array, no markdown, no explanation. Format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const cleaned = text.replace(/```json|```/g, "").trim();
  const questions: Question[] = JSON.parse(cleaned);
  return questions;
}