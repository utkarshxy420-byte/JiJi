import { setZoom } from "./nebula.js";

const title = document.getElementById("title");
const desc = document.getElementById("description");
const extra = document.getElementById("extra");
const back = document.getElementById("back");
const next = document.getElementById("next");
const bulletContainer = document.getElementById("bullets");
const app = document.querySelector(".app");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const loadingScreen = document.getElementById("loading-screen");

let i = -1;
let hasStarted = false;

function startExperience() {
  if (hasStarted) return;
  hasStarted = true;
  
  loadingScreen.classList.add("hidden");
  startScreen.classList.add("hidden");
  app.classList.remove("hidden");
  
  i = 0;
  render();
}

function render() {
  const page = PAGES[i];
  title.textContent = page.title;
  desc.textContent = page.text;
  extra.innerHTML = "";

  if (page.type === "bullets") {
    renderBullets(extra, page.items);
  } else if (page.type === "milestone") {
    renderMilestone(extra, page.stats);
  } else if (page.type === "images") {
    renderImageBoxes(extra, page.imageBoxes);
  } else if (page.chart) {
    renderChart(extra, page.chartType);
  }

  back.disabled = i === 0;
  next.disabled = i === PAGES.length - 1;

  bulletContainer.innerHTML = "";
  PAGES.forEach((_, idx) => {
    const b = document.createElement("div");
    b.className = "bullet" + (idx === i ? " active" : "");
    bulletContainer.appendChild(b);
  });

  setZoom(i);
  if (window.updateMistZoom) {
    window.updateMistZoom(i / (PAGES.length - 1));
  }
}

startBtn.onclick = startExperience;
back.onclick = () => { if (i > 0) i--, render(); };
next.onclick = () => { if (i < PAGES.length - 1) i++, render(); };

// Simulate loading
setTimeout(() => {
  loadingScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}, 2000);
