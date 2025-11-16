import { AudioConference, VideoConference } from "@livekit/components-react";

export default function ChatConference({ video }: { video: boolean }) {
  if (video) return <VideoConference key="video-conf" />;
  return <AudioConference key="audio-conf" />;
}
