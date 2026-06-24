"use client";

import { useState } from "react";

type GameStatus = "playing" | "dead";

interface GameState {
  bulletChamber: number;
  currentChamber: number;
  survivedCount: number;
  status: GameStatus;
}

function initGame(): GameState {
  return {
    bulletChamber: Math.floor(Math.random() * 6),
    currentChamber: 0,
    survivedCount: 0,
    status: "playing",
  };
}

function CylinderDisplay({
  current,
  bullet,
}: {
  current: number;
  bullet: number;
}) {
  const chambers = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="relative w-48 h-48">
      <div className="absolute inset-0 rounded-full border-4 border-gray-600 bg-gray-800" />
      {chambers.map((i) => {
        const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
        const radius = 38;
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius;
        const isCurrent = i === current;
        const isBullet = i === bullet;

        let bg = "bg-gray-600";
        if (isBullet) bg = "bg-red-600";
        else if (isCurrent) bg = "bg-yellow-400";

        return (
          <div
            key={i}
            className={`absolute w-9 h-9 rounded-full border-2 border-gray-400 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${bg}`}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {isBullet && (
              <div className="w-3 h-3 rounded-full bg-yellow-300" />
            )}
          </div>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-gray-400" />
      </div>
    </div>
  );
}

export default function RouletteGame() {
  const [state, setState] = useState<GameState>(initGame);

  function pullTrigger() {
    if (state.status === "dead") return;
    if (state.currentChamber === state.bulletChamber) {
      setState((s) => ({ ...s, status: "dead" }));
    } else {
      setState((s) => ({
        ...s,
        survivedCount: s.survivedCount + 1,
        currentChamber: (s.currentChamber + 1) % 6,
      }));
    }
  }

  function reset() {
    setState(initGame());
  }

  const isDead = state.status === "dead";

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Roulette Russe
      </h1>

      <CylinderDisplay
        current={state.currentChamber}
        bullet={isDead ? state.bulletChamber : -1}
      />

      <div className="text-center">
        {isDead ? (
          <p className="text-2xl font-bold text-red-500">💀 Vous êtes mort.</p>
        ) : (
          <p className="text-lg text-gray-400">
            Survécus : <span className="text-white font-bold">{state.survivedCount}</span>
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={pullTrigger}
          disabled={isDead}
          className="px-6 py-3 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-white transition-colors"
        >
          🔫 Appuyer sur la gâchette
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 font-semibold text-white transition-colors"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}
