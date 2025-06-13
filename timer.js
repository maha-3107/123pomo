"use client";
import { useState, useEffect } from "react";

export default function Timer() {
  const [duration, setDuration] = useState(25 * 60); // default 25 mins
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState("");

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setQuote("");
  };

  const fetchQuote = async () => {
    const res = await fetch("/api/quote");
    const data = await res.json();
    setQuote(data.quote);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      fetchQuote();
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
      <div className="space-x-4">
        {!isRunning && (
          <button onClick={startTimer} className="bg-green-600 text-white px-4 py-2 rounded">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={pauseTimer} className="bg-yellow-600 text-white px-4 py-2 rounded">
            Pause
          </button>
        )}
        <button onClick={resetTimer} className="bg-red-600 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>

      {quote && (
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-gray-700">
          <p className="italic">“{quote}”</p>
        </div>
      )}
    </div>
  );
}
// Note: Ensure you have an API endpoint at /api/quote that returns a JSON object with a "quote" field.