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
    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");

    const { content, fileUrl } = await req.json();

    if (!serverId) {
      return NextResponse.json({ error: "Server ID Missing" }, { status: 400 });
    }
    if (!channelId) {
      return NextResponse.json(
        { error: "Channel ID Missing" },
        { status: 400 },
      );
    }
    if (!content && !fileUrl) {
      return NextResponse.json({ error: "Content Missing" }, { status: 400 });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: { members: true },
    });
    if (!server) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId,
      },
    });
    if (!channel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const member = server.members.find((m) => m.profileId === profile.id);
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId,
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
      const channelKey = `chat:${channelId}:messages`;
      io?.emit(channelKey, message);
    } catch (emitError) {
      console.error("Socket emit error:", emitError);
    }

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
