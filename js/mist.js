const fog = document.getElementById("fog");
const ftx = fog.getContext("2d");

fog.width = innerWidth;
fog.height = innerHeight;

let t = 0;
let currentZoom = 0.3;

window.updateMistZoom = function(z) {
  currentZoom = z;
};

function drawMist() {
  t += 0.001;
  ftx.clearRect(0, 0, fog.width, fog.height);

  const centerX = fog.width / 2;
  const centerY = fog.height / 2;
  const baseRadius = 300 * (1 + currentZoom);

  for (let i = 0; i < 8; i++) {
    const angle = t + (i / 8) * Math.PI * 2;
    const x = centerX + Math.sin(angle) * 200 * (1 + Math.sin(t + i) * 0.3);
    const y = centerY + Math.cos(angle) * 150 * (1 + Math.cos(t + i) * 0.3);

    const colors = ["rgba(42,108,245", "rgba(255,211,106", "rgba(60,255,176"];
    const color = colors[i % 3];
    
    const g = ftx.createRadialGradient(x, y, 0, x, y, baseRadius);
    g.addColorStop(0, `${color}, 0.08)`);
    g.addColorStop(0.5, `${color}, 0.03)`);
    g.addColorStop(1, "transparent");

    ftx.fillStyle = g;
    ftx.fillRect(0, 0, fog.width, fog.height);
  }

  const outerGradient = ftx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 1.5);
  outerGradient.addColorStop(0, "transparent");
  outerGradient.addColorStop(1, "rgba(2,3,8, 0.6)");
  ftx.fillStyle = outerGradient;
  ftx.fillRect(0, 0, fog.width, fog.height);

  requestAnimationFrame(drawMist);
}

drawMist();
