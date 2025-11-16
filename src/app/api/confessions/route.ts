import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const confessions = await db.confession.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(confessions);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch confessions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, theme } = body;

    if (!content || !theme) {
      return NextResponse.json(
        { error: "Content and theme are required" },
        { status: 400 }
      );
    }

    const newConfession = await db.confession.create({
      data: {
        content,
        theme,
        // Optional: you can set a default bgImage or leave null
        bgImage: "",
        likeCount: 0,
      },
    });

    return NextResponse.json(newConfession, { status: 201 });
  } catch (err) {
    console.error("Error creating confession:", err);
    return NextResponse.json(
      { error: "Failed to create confession" },
      { status: 500 }
    );
  }
}
