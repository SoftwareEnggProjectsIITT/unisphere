import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { io } from "@/lib/socket";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    const { content, fileUrl } = await req.json();

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID Missing" },
        { status: 400 },
      );
    }
    if (!content && !fileUrl) {
      return NextResponse.json({ error: "Content Missing" }, { status: 400 });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          {
            memberTwo: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    try {
      const channelKey = `chat:${conversationId}:messages`;
      io?.emit(channelKey, message);
    } catch (emitError) {
      console.error("Socket emit error:", emitError);
    }

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("[DIRECT_MESSAGES_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
