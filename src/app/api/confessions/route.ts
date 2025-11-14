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
