
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ serverId: string }>; }) {
  try {
    const myparams = await params
    const profile = await currentProfile()
    const { name, imageUrl } = await req.json()

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
        name, imageUrl
      }
    })

    return NextResponse.json(server)

  } catch (error) {

    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });

  }
}
