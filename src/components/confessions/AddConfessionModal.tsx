"use client";
import { useState } from "react";

interface AddConfessionModalProps {
  closeModal: () => void;
  onSuccess: () => void;
}

const CHARACTER_LIMIT = 1500;
const THEMES = ["LOVE", "REGRET", "FUNNY", "STRESS", "RANDOM"];

export default function AddConfessionModal({
  closeModal,
  onSuccess,
}: AddConfessionModalProps) {
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("RANDOM");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await fetch("/api/confessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, theme }),
      });
      setContent("");
      setTheme("RANDOM");
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-background p-6 rounded-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Your Confession</h2>

        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground"
          rows={6}
          maxLength={CHARACTER_LIMIT}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your confession here..."
        />

        <div className="text-sm text-gray-500 mb-4">
          {content.length} / {CHARACTER_LIMIT}
        </div>

        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {THEMES.map((t) => (
            <option
              key={t}
              value={t}
              className="bg-white text-black dark:bg-gray-700 dark:text-white"
            >
              {t}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${
            content.trim()
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
