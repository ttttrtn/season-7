const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/api/miraculous-countdown", (req, res) => {
  const premiere = new Date("2026-11-21T00:00:00Z");
  // November 20, 7 PM Eastern Standard Time

  const now = Date.now();
  const remaining = Math.max(0, premiere.getTime() - now);
  const totalSeconds = Math.floor(remaining / 1000);

  res.set("Cache-Control", "no-store");

  res.json({
    title: "Miraculous Ladybug Season 7",
    message: "Premieres November 20th at 7:00 PM!",
    premiereDate: "2026-11-20T19:00:00-05:00",
    timezone: "America/New_York",
    countdown: {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      totalSeconds
    },
    status: remaining > 0 ? "upcoming" : "premiered"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Countdown API listening on port ${PORT}`);
});
