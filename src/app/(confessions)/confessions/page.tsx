import { db } from "@/lib/db";
import ConfessionCollage from "@/components/confessions/ConfessionCollage";
import { themes } from "@/lib/themes";

export default async function ConfessionsPage() {
  const confessionsFromDb = await db.confession.findMany({
    orderBy: { createdAt: "desc" },
  });

  const confessions = confessionsFromDb.map((c) => {
    const themeObj = themes.find((t) => t.name === c.theme);
    const gradient =
      themeObj?.gradients[
        Math.floor(Math.random() * (themeObj.gradients.length || 1))
      ] || "linear-gradient(135deg, #ccc, #eee)";

    return {
      id: c.id,
      header: c.theme,
      message: c.content,
      theme: c.theme,
      createdAt: c.createdAt.toISOString(),
      gradient,
      likeCount: c.likeCount, // for scaling
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6">Anonymous Confessions</h1>
      <ConfessionCollage confessions={confessions} />
    </main>
  );
}
