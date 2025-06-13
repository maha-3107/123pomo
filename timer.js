import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState("");

  // Settings
  const [pomodoro, setPomodoro] = useState(() => localStorage.getItem("pomodoro") || 25);
  const [shortBreak, setShortBreak] = useState(() => localStorage.getItem("shortBreak") || 5);
  const [longBreak, setLongBreak] = useState(() => localStorage.getItem("longBreak") || 15);

  // Sessions
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem("sessions") || 0));

  const startTimer = () => {
    setTime(pomodoro * 60);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTime(pomodoro * 60);
    setIsRunning(false);
  };

  // Countdown logic
  useEffect(() => {
    let timerInterval;

    if (isRunning && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      clearInterval(timerInterval);
      setIsRunning(false);
      setSessions((prev) => {
        const updated = prev + 1;
        localStorage.setItem("sessions", updated);
        return updated;
      });
      fetchQuote(); // show quote
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
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>

      {/* Settings */}
      <div className="max-w-md mx-auto bg-yellow-50 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Timer Settings</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("pomodoro", pomodoro);
            localStorage.setItem("shortBreak", shortBreak);
            localStorage.setItem("longBreak", longBreak);
            alert("Settings saved!");
          }}
          className="flex flex-col gap-2"
        >
          <label>
            Pomodoro (min):
            <input
              type="number"
              value={pomodoro}
              min="5"
              onChange={(e) => setPomodoro(e.target.value)}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>
          <label>
            Short Break (min):
            <input
              type="number"
              value={shortBreak}
              min="1"
              onChange={(e) => setShortBreak(e.target.value)}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>
          <label>
            Long Break (min):
            <input
              type="number"
              value={longBreak}
              min="5"
              onChange={(e) => setLongBreak(e.target.value)}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save Settings
          </button>
        </form>
      </div>

      {/* Timer */}
      <div className="text-6xl mb-4">{formatTime(time)}</div>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={startTimer}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Reset
        </button>
      </div>

      {/* Session Count */}
      <p className="text-lg font-medium text-gray-700 mb-4">
        Sessions Completed: {sessions}
      </p>

      {/* Motivational Quote */}
      {quote && (
        <div className="mt-6 p-4 bg-yellow-100 text-gray-700 rounded shadow">
          <p className="italic">"{quote}"</p>
        </div>
      )}
    </div>
  );
}
