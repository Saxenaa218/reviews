import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { spaceName: string } }
) {
  const slug = params.spaceName;
  return NextResponse.json({
    spaceName: slug,
    logo: "https://via.placeholder.com/150/4e2b80",
    title: "Hey",
    message: "add a message here",
    questions: [
      "Who are you / what are you working on?",
      "What is the best thing about [our product / service]",
      "How has [our product / service] helped you?",
    ],
  });
}
