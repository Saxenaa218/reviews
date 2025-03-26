import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { uploadToS3 } from "@/lib/s3-upload";
import { PrismaClient } from "@prisma/client";

const createTopicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required"),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  allowText: z.boolean(),
  allowVideo: z.boolean(),
  logo: z.string().startsWith("data:image/jpeg;base64", "Invalid logo format"),
  questions: z.array(z.string()),
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = createTopicSchema.parse(body);

    const logoUrl = await uploadToS3(validatedData.logo, "topics");

    console.log({
      ...validatedData,
      logo: logoUrl,
    });

    const acq = await prisma.topic.create({
      data: {
        name: validatedData.topicName,
        title: validatedData.title,
        message: validatedData.message,
        allowText: validatedData.allowText,
        allowVideo: validatedData.allowVideo,
        logo: logoUrl,
        questions: validatedData.questions,
        user: {
          connect: {
            id: body.user,
          },
        },
      },
    });

    console.log({ acq });

    return NextResponse.json(
      {
        success: true,
        message: "Topic created successfully",
        data: {
          ...validatedData,
          logo: logoUrl,
        },
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
