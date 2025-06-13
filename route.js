export async function GET() {
  const quotes = [
    "Stay focused and never give up!",
    "Small progress is still progress.",
    "Push yourself because no one else will do it for you.",
    "Discipline is the bridge between goals and accomplishment.",
    "Your future is created by what you do today, not tomorrow.",
    "Every Pomodoro counts. Keep going!",
    "Productivity is not about doing more, it's about doing what matters.",
    "Success is the sum of small efforts repeated day in and day out."
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return new Response(
    JSON.stringify({ quote: randomQuote }),
    { headers: { "Content-Type": "application/json" } }
  );
}
