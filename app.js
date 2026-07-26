import { loadProgress, saveProgress } from "./js/storage.js";
import { formatCountdown } from "./js/reset.js";

const progress = loadProgress();

console.log("Saved Progress:", progress);

function updateTimer() {
  const timer = document.getElementById("resetTimer");
  if (timer) {
    timer.textContent = formatCountdown();
  }
}

setInterval(updateTimer, 1000);
updateTimer();
