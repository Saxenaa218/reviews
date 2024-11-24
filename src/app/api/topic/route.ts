import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();
  if (session?.user?.email) {
    const topics = await prisma.topic.findMany({
      where: {
        user: {
          email: session?.user?.email,
        },
      },
    });
    const json = {
      topics,
    };

    return NextResponse.json(json);
  } else {
    return NextResponse.json(
      {
        message: "Error occured reading topics",
      },
      {
        status: 400,
      }
    );
  }
}
