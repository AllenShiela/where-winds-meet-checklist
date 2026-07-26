// Where Winds Meet Companion v2.0

const completedTasks = 0;
const totalTasks = 20;

const progress = Math.round((completedTasks / totalTasks) * 100);

const progressText = document.getElementById("progressPercent");
const completed = document.getElementById("completedTasks");
const remaining = document.getElementById("remainingTasks");
const streak = document.getElementById("streak");

if (progressText) progressText.textContent = progress + "%";
if (completed) completed.textContent = completedTasks;
if (remaining) remaining.textContent = totalTasks - completedTasks;
if (streak) streak.textContent = localStorage.getItem("streak") || "1 Day";

function updateResetTimer() {
    const now = new Date();

    // Daily reset at 4:00 AM local time
    const reset = new Date();
    reset.setHours(4, 0, 0, 0);

    if (now >= reset) {
        reset.setDate(reset.getDate() + 1);
    }

    const diff = reset - now;

    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const timer = document.getElementById("resetTimer");
    if (timer) {
        timer.textContent = `${h}h ${m}m ${s}s`;
    }
}

setInterval(updateResetTimer, 1000);
updateResetTimer();
