import fetch from "node-fetch";
import express from "express";

const url = "https://pomber.github.io/covid19/timeseries.json";

const app = express();

let timeline = null;

async function loadTimeline() {
  const fromDate = new Date();
  if (timeline === null) {
    const r = await fetch(url);
    timeline = await r.json();
  }
  const toDate = new Date();
  console.log("Loading time: " + (toDate.getTime() - fromDate.getTime()));

  return timeline;
}

app.get("/:country", async (req, res) => {
  const result = await loadTimeline();
  res.send(result[req.params.country]);
});

app.listen(8080, () => console.log("listening on port: 8080"));
