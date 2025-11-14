import { Server, Member, Profile } from "@/app/generated/prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
