"use client";

import React, { useMemo } from "react";
import styles from "./ConfessionCard.module.css";

interface ConfessionCardProps {
  header: string;
  message: string;
  theme: string;
  gradient: string;
  likeCount: number;
  onClick: () => void;
}

const ConfessionCard: React.FC<ConfessionCardProps> = ({
  header,
  message,
  theme,
  gradient,
  likeCount,
  onClick,
}) => {
  // Random rotation per card
  const rotation = useMemo(() => {
    const minDeg = -15;
    const maxDeg = 15;
    return Math.random() * (maxDeg - minDeg) + minDeg;
  }, []);

  // Scale based on likeCount (dominant)
  const scale = useMemo(() => {
    const minScale = 1;
    const maxScale = 1.3; // cards with most likes dominate
    const maxLikes = 50; // adjust based on your data
    return Math.min(
      minScale + (likeCount / maxLikes) * (maxScale - minScale),
      maxScale
    );
  }, [likeCount]);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-6 shadow-lg text-white flex flex-col justify-between
                  hover:scale-105 hover:shadow-2xl transition-transform duration-300 ${styles.handwritingFont}`}
      style={{
        background: gradient,
        transform: `rotate(${rotation}deg) scale(${scale})`,
      }}
    >
      <h3 className="font-bold text-lg mb-2">{header}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ConfessionCard;
