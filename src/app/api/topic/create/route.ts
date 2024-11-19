import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createTopicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required"),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  allowText: z.boolean(),
  allowVideo: z.boolean(),
  logo: z.array(z.any()),
  questions: z.array(z.string()),
});

type CreateTopicInput = z.infer<typeof createTopicSchema>;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the input
    const validatedData = createTopicSchema.parse(body);

    // Here you would typically:
    // 1. Process the logo file
    // 2. Save to your database
    // 3. Return the created topic

    // For now, returning a success response
    return NextResponse.json(
      {
        success: true,
        message: "Topic created successfully",
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error creating topic:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
