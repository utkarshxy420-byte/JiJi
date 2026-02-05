const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let w, h;
let zoom = 1, targetZoom = 1;
let rotation = 0;

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();

const particles = Array.from({ length: 1200 }, (_, i) => ({
  angle: (i / 1200) * Math.PI * 2,
  distance: Math.random() * 400,
  speed: Math.random() * 0.003 + 0.001,
  size: Math.random() * 3 + 0.5,
  color: ["#2a6cf5", "#ffd36a", "#3cffb0"][Math.floor(Math.random() * 3)],
  life: Math.random() * 0.5 + 0.5
}));

export function setZoom(level) {
  targetZoom = 0.3 + level * 0.4;
}

function drawVortex() {
  const centerX = w / 2;
  const centerY = h / 2;
  
  particles.forEach(p => {
    p.angle += p.speed;
    p.distance = (p.distance + 1.5) % 500;
    
    const x = centerX + Math.cos(p.angle) * p.distance;
    const y = centerY + Math.sin(p.angle) * p.distance;
    
    const distFromCenter = p.distance / 500;
    const opacity = (1 - distFromCenter) * p.life * 0.8;
    
    ctx.fillStyle = p.color.replace(")", `,${opacity})`).replace("#", "rgba(");
    if (p.color.startsWith("#")) {
      const rgb = p.color === "#2a6cf5" ? "42, 108, 245" : 
                  p.color === "#ffd36a" ? "255, 211, 106" : 
                  "60, 255, 176";
      ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
    }
    
    const size = p.size * (1 - distFromCenter);
    ctx.beginPath();
    ctx.arc(x, y, Math.max(size, 0.5), 0, Math.PI * 2);
    ctx.fill();
  });
}

function draw() {
  zoom += (targetZoom - zoom) * 0.08;
  rotation += 0.001;

  ctx.fillStyle = "rgba(4,6,17,0.15)";
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(zoom, zoom);
  ctx.rotate(rotation);
  ctx.translate(-w / 2, -h / 2);
  
  drawVortex();
  
  ctx.restore();

  requestAnimationFrame(draw);
}

draw();
