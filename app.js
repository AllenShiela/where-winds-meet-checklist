import { formatCountdown } from "./js/reset.js";

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-item");

function showPage(pageId) {
  pages.forEach(page => page.classList.remove("active"));

  const selected = document.getElementById(pageId);
  if (selected) {
    selected.classList.add("active");
  }

  navButtons.forEach(btn => btn.classList.remove("active"));

  const activeButton = document.querySelector(`[data-page="${pageId}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

showPage("home-page");

function updateTimer() {
  const timer = document.getElementById("resetTimer");
  if (timer) {
    timer.textContent = formatCountdown();
  }
}

setInterval(updateTimer, 1000);
updateTimer();
