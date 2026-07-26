// reset.js

export function getNextReset() {
  const now = new Date();
  const reset = new Date();

  reset.setHours(4, 0, 0, 0);

  if (now >= reset) {
    reset.setDate(reset.getDate() + 1);
  }

  return reset;
}

export function formatCountdown() {
  const diff = getNextReset() - new Date();

  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${h}h ${m}m ${s}s`;
}
