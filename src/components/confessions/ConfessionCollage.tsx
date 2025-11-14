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
      {/* Masonry grid with CSS columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {confessions.map((c) => (
          <ConfessionCard
            key={c.id}
            header={c.header}
            message={c.message}
            theme={c.theme}
            gradient={c.gradient}
            likeCount={c.likeCount}
            onClick={() => setSelectedConfession(c)}
          />
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
