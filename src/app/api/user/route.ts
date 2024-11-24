import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, image } = await request.json();

    // Validate required fields
    if (!email || !name || !image) {
      return NextResponse.json(
        { error: "Name, email and image are required" },
        { status: 400 }
      );
    }

    // Find or create user with their topics
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, image }, // Update name and image if user exists
      create: {
        email,
        name,
        image,
      },
      // Include topics in the response
      include: {
        topics: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error processing user:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        topics: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
