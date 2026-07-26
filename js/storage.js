// storage.js

const STORAGE_KEY = "wwm-daily-progress";

export function loadProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
