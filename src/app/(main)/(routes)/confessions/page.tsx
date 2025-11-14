import { db } from "@/lib/db";
import ConfessionsPageClient from "@/components/confessions/ConfessionsPageClient";
import { themes } from "@/lib/themes";

export default async function ConfessionsPage() {
  const confessionsFromDb = await db.$queryRaw<
    {
      id: string;
      content: string;
      theme: string;
      bgImage: string;
      likeCount: number;
      createdAt: Date;
    }[]
  >`SELECT * FROM "Confession" ORDER BY RANDOM()`;

  const confessions = confessionsFromDb.map((c) => {
    const themeObj = themes.find((t) => t.name === c.theme);
    const gradient =
      themeObj?.gradients[0] || "linear-gradient(135deg, #ccc, #eee)";

    return {
      id: c.id,
      header: c.theme,
      message: c.content,
      theme: c.theme,
      createdAt: c.createdAt.toISOString(),
      gradient,
      likeCount: c.likeCount,
    };
  });

  return <ConfessionsPageClient confessions={confessions} />;
}
