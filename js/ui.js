import { setZoom } from "./nebula.js";

const title = document.getElementById("title");
const desc = document.getElementById("description");
const extra = document.getElementById("extra");
const back = document.getElementById("back");
const next = document.getElementById("next");
const bullets = document.getElementById("bullets");

let i = 0;

function render() {
  const page = PAGES[i];
  title.textContent = page.title;
  desc.textContent = page.text;
  extra.innerHTML = "";

  if (page.chart) {
    renderChart(extra, page.chartType);
  }

  back.disabled = i === 0;
  next.disabled = i === PAGES.length - 1;

  bullets.innerHTML = "";
  PAGES.forEach((_, idx) => {
    const b = document.createElement("div");
    b.className = "bullet" + (idx === i ? " active" : "");
    bullets.appendChild(b);
  });

  setZoom(i);
  if (window.updateMistZoom) {
    window.updateMistZoom(i / (PAGES.length - 1));
  }
}

back.onclick = () => { if (i > 0) i--, render(); };
next.onclick = () => { if (i < PAGES.length - 1) i++, render(); };

render();
