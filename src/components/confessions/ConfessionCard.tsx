import React from "react";

interface ConfessionCardProps {
  header: string;
  message: string;
  theme: string;
  onClick: () => void;
}

const ConfessionCard: React.FC<ConfessionCardProps> = ({
  header,
  message,
  theme,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl p-4 shadow-md bg-card text-card-foreground hover:scale-[1.02] transition-transform"
    >
      <h3 className="font-semibold mb-2">{header}</h3>
      <p className="line-clamp-3 text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default ConfessionCard;
