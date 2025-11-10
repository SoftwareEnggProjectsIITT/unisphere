import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(req: Request, { params }: { params: Promise<{ serverId: string }>; }) {
  try {
    const myparams = await params
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse("Unauthorised", { status: 401 })
    }

    if (!myparams.serverId) {
      return new NextResponse("Server ID Missing", { status: 401 })
    }

    const server = await db.server.update({
      where: {
        id: myparams.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4()
      }
    })

  } catch (error) {

    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });

  }
}
