import { db } from "@/lib/db";
import ConfessionCollage from "@/components/confessions/ConfessionCollage";
import { themes } from "@/lib/themes";

export default async function ConfessionsPage() {
  // Fetch confessions in random order
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

  // Map DB fields to component fields, include a fixed gradient per theme
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

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6">Anonymous Confessions</h1>
      <ConfessionCollage confessions={confessions} />
    </main>
  );
}
