import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState("");

  const startTimer = () => {
    if (time > 0) setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
    setQuote(""); // Clear quote
  };

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setIsRunning(false);
      fetchQuote();
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const fetchQuote = async () => {
    const res = await fetch("/api/quote");
    const data = await res.json();
    setQuote(data.quote || "Stay motivated!");
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="text-6xl mb-4">{formatTime(time)}</div>
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={startTimer} className="bg-green-500 px-6 py-2 text-white rounded">
          Start
        </button>
        <button onClick={resetTimer} className="bg-red-500 px-6 py-2 text-white rounded">
          Reset
        </button>
      </div>
      {quote && (
        <div className="bg-yellow-100 p-4 rounded shadow-md text-gray-800">
          <p className="italic">"{quote}"</p>
        </div>
      )}
    </div>
  );
}
