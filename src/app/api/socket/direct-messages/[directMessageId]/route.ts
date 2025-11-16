import { NextResponse } from "next/server";
import { MemberRole } from "@/app/generated/prisma/enums";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { io } from "@/lib/socket";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ directMessageId: string }> },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    const { searchParams } = new URL(req.url);

    const myParams = await params;

    const conversationId = searchParams.get("conversationId");
    const directMessageId = myParams.directMessageId;

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID Missing" },
        { status: 400 },
      );
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
      conversation?.memberOne.profileId === profile.id
        ? conversation?.memberOne
        : conversation?.memberTwo;

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId,
        conversationId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!directMessage || directMessage.deleted) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const isMessageOwner = directMessage.memberId === member.id;
    if (!isMessageOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    directMessage = await db.directMessage.update({
      where: {
        id: directMessageId,
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

    io?.emit(`chat:${conversation.id}:messages:update`, directMessage);

    return NextResponse.json(directMessage);
  } catch (error) {
    console.error("[DIRECT_MESSAGE_PATCH]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ directMessageId: string }> },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const myParams = await params;

    const conversationId = searchParams.get("conversationId");
    const directMessageId = myParams.directMessageId;

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID Missing" },
        { status: 400 },
      );
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
      conversation?.memberOne.profileId === profile.id
        ? conversation?.memberOne
        : conversation?.memberTwo;

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId,
        conversationId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!directMessage || directMessage.deleted) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const isMessageOwner = directMessage.memberId === member.id;
    if (!isMessageOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    directMessage = await db.directMessage.update({
      where: {
        id: directMessageId,
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

    io?.emit(`chat:${conversation.id}:messages:update`, directMessage);

    return NextResponse.json(directMessage);
  } catch (error) {
    console.error("[DIRECT_MESSAGES_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
