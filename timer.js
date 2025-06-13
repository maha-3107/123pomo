import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState("");

  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  const startTimer = () => {
    setTime(pomodoro * 60);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTime(pomodoro * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    let timerInterval;
    if (isRunning && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      clearInterval(timerInterval);
      setIsRunning(false);
      fetchQuote();
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, time]);

  const fetchQuote = async () => {
    const res = await fetch("/api/quote");
    const data = await res.json();
    setQuote(data.quote);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="text-center p-6 bg-orange-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>

      {/* Timer Settings */}
      <div className="inline-block bg-yellow-100 p-6 rounded shadow-md mb-6 text-left">
        <h2 className="text-xl font-semibold text-orange-600 mb-4">Timer Settings</h2>
        <div className="mb-2">
          <label>Pomodoro (minutes): </label>
          <input
            type="number"
            value={pomodoro}
            onChange={(e) => setPomodoro(Number(e.target.value))}
            className="p-1 rounded border ml-2"
          />
        </div>
        <div className="mb-2">
          <label>Short Break (minutes): </label>
          <input
            type="number"
            value={shortBreak}
            onChange={(e) => setShortBreak(Number(e.target.value))}
            className="p-1 rounded border ml-2"
          />
        </div>
        <div className="mb-4">
          <label>Long Break (minutes): </label>
          <input
            type="number"
            value={longBreak}
            onChange={(e) => setLongBreak(Number(e.target.value))}
            className="p-1 rounded border ml-2"
          />
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-6xl mb-4 font-mono">{formatTime(time)}</div>
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={startTimer} className="bg-green-500 px-4 py-2 rounded text-white">Start</button>
        <button onClick={resetTimer} className="bg-red-500 px-4 py-2 rounded text-white">Reset</button>
      </div>

      {quote && (
        <div className="mt-6 p-4 bg-yellow-200 text-gray-700 rounded shadow w-fit mx-auto">
          <p className="italic">"{quote}"</p>
        </div>
      )}
    </div>
  );
}
