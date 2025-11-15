import { NextResponse } from "next/server";
import { MemberRole } from "@/app/generated/prisma/enums";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { io } from "@/lib/socket";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");

    const myParams = await params;

    const messageId = myParams.messageId;

    if (!serverId) {
      return NextResponse.json({ error: "Server ID Missing" }, { status: 400 });
    }
    if (!channelId) {
      return NextResponse.json(
        { error: "Channel ID Missing" },
        { status: 400 },
      );
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
      include: {
        members: true,
      },
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

    let message = await db.message.findFirst({
      where: {
        id: messageId,
        channelId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const isMessageOwner = message.memberId === member.id;
    if (!isMessageOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    message = await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        content,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    io?.emit(`chat:${channelId}:messages:update`, message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGES_PATCH]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const myParams = await params;

    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");
    const messageId = myParams.messageId;

    if (!serverId) {
      return NextResponse.json({ error: "Server ID Missing" }, { status: 400 });
    }
    if (!channelId) {
      return NextResponse.json(
        { error: "Channel ID Missing" },
        { status: 400 },
      );
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
      include: {
        members: true,
      },
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

    let message = await db.message.findFirst({
      where: {
        id: messageId,
        channelId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const isMessageOwner = message.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    message = await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        fileUrl: null,
        content: "This message has been deleted.",
        deleted: true,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    io?.emit(`chat:${channelId}:messages:update`, message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGES_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
