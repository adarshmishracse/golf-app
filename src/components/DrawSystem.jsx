import { useState } from "react";

export default function DrawSystem({ scores }) {
  const [result, setResult] = useState(null);
  const [winningNumber, setWinningNumber] = useState(null);

  const runDraw = () => {
    const random = Math.floor(Math.random() * 45) + 1;
    setWinningNumber(random);

    const userNumbers = scores.map(s => s.score);

    if (userNumbers.includes(random)) {
      setResult("WIN");
    } else {
      setResult("LOSE");
    }
  };

return (
  <div className="flex justify-center py-10">
    <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl p-10 rounded-2xl text-center shadow-xl">

      <h2 className="text-3xl font-bold mb-8">
        🎯 Lucky Draw
      </h2>

      {/* Number Box */}
      <div className="bg-black/40 rounded-xl py-12 mb-8">
        <p className="text-gray-400 mb-2">Winning Number</p>

        <h1 className="text-6xl font-bold tracking-widest">
          {winningNumber || "--"}
        </h1>
      </div>

      {/* Button */}
      <button
        onClick={runDraw}
        className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition mb-6"
      >
        🎲 Run Draw
      </button>

      {/* Result */}
      {result && (
        <p
          className={`text-2xl font-bold ${
            result === "WIN" ? "text-green-400" : "text-red-400"
          }`}
        >
          {result === "WIN"
            ? "🎉 Congratulations! You Won!"
            : "😔 Try Again Next Time"}
        </p>
      )}
    </div>
  </div>
);
}