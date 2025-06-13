const quotes = [
  "The journey of a thousand miles begins with a single step.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don’t watch the clock; do what it does. Keep going.",
  "It always seems impossible until it’s done.",
  "Discipline is choosing between what you want now and what you want most.",
  "Small habits make a big difference.",
  "You don’t have to be extreme, just consistent.",
  "One day or day one — you decide.",
  "Progress, not perfection.",
  "Push yourself, because no one else is going to do it for you.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "A little progress each day adds up to big results.",
  "Your future is created by what you do today, not tomorrow.",
  "Motivation gets you going, but discipline keeps you growing.",
  "Habits are the compound interest of self-improvement.",
  "Do something today that your future self will thank you for.",
  "Action is the foundational key to all success.",
  "Consistency is more important than perfection.",
  "Don’t break the chain.",
  "Fall in love with the process, and the results will come.",
  "Your life does not get better by chance, it gets better by change.",
  "Start where you are. Use what you have. Do what you can.",
  "Some people want it to happen, some wish it would happen, others make it happen.",
  "If you’re tired of starting over, stop giving up.",
];

export function getQuoteOfTheDay(date = new Date()) {
  const index =
    Math.abs(
      date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDate()
    ) % quotes.length;
  return quotes[index];
}
