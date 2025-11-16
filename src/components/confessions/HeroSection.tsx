interface HeroSectionProps {
  openModal: () => void;
}

export default function HeroSection({ openModal }: HeroSectionProps) {
  return (
    <section className="max-w-4xl mx-auto h-[50vh] flex flex-col justify-center items-center text-center mb-32 relative">
      <h1 className="text-8xl font-bold mb-8 mt-12">Confessions</h1>

      <p className="text-2xl text-gray-400 font-medium italic mb-16">
        Secrets spilled, thoughts revealed, and feelings shared… <br />
        All anonymously, just for you to read.
      </p>

      <button
        onClick={openModal}
        className="px-10 py-4 rounded-full border-2 border-gray-800 text-gray-800 text-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-black"
      >
        Add Confession
      </button>
    </section>
  );
}
