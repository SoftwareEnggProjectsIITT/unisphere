"use client";

import React from "react";

interface Confession {
  id: string;
  header: string;
  message: string;
  theme: string;
  createdAt: string;
  gradient: string; // new field
}

interface Props {
  confessions: Confession[];
}

export default function ConfessionCollage({ confessions }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {confessions.map((confession) => (
        <div
          key={confession.id}
          className="rounded-xl p-6 shadow-lg text-white min-h-[180px] flex flex-col justify-between"
          style={{ background: confession.gradient }}
        >
          <h2 className="font-bold text-lg mb-2">{confession.header}</h2>
          <p className="text-sm">{confession.message}</p>
        </div>
      ))}
    </div>
  );
}
