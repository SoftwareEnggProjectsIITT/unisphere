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
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto h-[50vh] flex flex-col justify-center items-center text-center mb-8">
        <h1 className="text-8xl font-bold">Confessions</h1>
        <p className="mt-4 text-2xl text-gray-700 font-medium italic">
          Secrets spilled, thoughts revealed, and feelings shared… <br />
          All anonymously, just for you to read.
        </p>
      </section>

      {/* Confession Collage */}
      <ConfessionCollage confessions={confessions} />
    </main>
  );
}
