import type { Metadata } from "next";
import RouletteGame from "./RouletteGame";

export const metadata: Metadata = {
  title: "Roulette Russe",
};

export default function RoulettePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-950 text-white">
      <RouletteGame />
    </main>
  );
}
