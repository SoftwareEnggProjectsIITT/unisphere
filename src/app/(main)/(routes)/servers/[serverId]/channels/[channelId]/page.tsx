import { ChannelType } from "@/app/generated/prisma/enums";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import MediaRoom from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const myParams = await params;
  const profile = await currentProfile();

  if (!profile) {
    return (await auth()).redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: myParams.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: myParams.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <>
          <MediaRoom serverId={myParams.serverId} chatId={channel.id} video={false} audio={true} />
        </>
      )}
      {channel.type === ChannelType.VIDEO && (
        <>
          <MediaRoom serverId={myParams.serverId} chatId={channel.id} video={true} audio={true} />
        </>
      )}
    </div>
  );
};

export default ChannelIdPage;
