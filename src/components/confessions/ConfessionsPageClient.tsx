"use client";

import { useState } from "react";
import ConfessionCollage from "@/components/confessions/ConfessionCollage";
import HeroSection from "@/components/confessions/HeroSection";
import AddConfessionModal from "@/components/confessions/AddConfessionModal";
import Toast from "@/components/confessions/Toast";

interface Confession {
  id: string;
  header: string;
  message: string;
  theme: string;
  createdAt: string;
  gradient: string;
  likeCount: number;
}

interface ConfessionsPageClientProps {
  confessions: Confession[];
}

export default function ConfessionsPageClient({
  confessions,
}: ConfessionsPageClientProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmission = () => {
    // called after POST succeeds
    setModalOpen(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <main className="min-h-full bg-background text-foreground flex flex-col p-6">
      <HeroSection openModal={openModal} />

      <section className="flex-1 w-full max-w-4xl mx-auto">
        <ConfessionCollage confessions={confessions} />
      </section>

      {isModalOpen && (
        <AddConfessionModal
          closeModal={closeModal}
          onSuccess={handleSubmission}
        />
      )}

      {toastVisible && <Toast message="Confession submitted!" />}
    </main>
  );
}
