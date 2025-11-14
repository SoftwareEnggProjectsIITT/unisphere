"use client";

import React, { useState } from "react";
import ConfessionCard from "./ConfessionCard";
import ConfessionModal from "./ConfessionModal";

interface Confession {
  id: string;
  header: string;
  message: string;
  theme: string;
  gradient: string;
  likeCount: number;
  createdAt: string;
}

interface Props {
  confessions: Confession[];
}

export default function ConfessionCollage({ confessions }: Props) {
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>(null);

  return (
    <>
      {/* Grid layout for responsive masonry-like effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
        {confessions.map((c) => (
          <div key={c.id} className="w-full">
            <ConfessionCard
              header={c.header}
              message={c.message}
              theme={c.theme}
              gradient={c.gradient}
              likeCount={c.likeCount}
              onClick={() => setSelectedConfession(c)}
            />
          </div>
        ))}
      </div>

      {/* Spotlight modal */}
      <ConfessionModal
        isOpen={!!selectedConfession}
        confession={selectedConfession}
        onClose={() => setSelectedConfession(null)}
      />
    </>
  );
}
