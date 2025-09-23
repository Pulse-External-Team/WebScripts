(() => {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let color = 0;
  const lineWidth = 5;
  let running = true;

  function hsvToRgb(h, s, v) {
    let f = (n, k = (n + h*6) % 6) => v - v*s*Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)];
  }

  function drawBezier() {
    if (!running) return;

    color = (color + 0.02) % 1.0;
    const rgb = hsvToRgb(color, 1, 1);
    ctx.strokeStyle = `rgb(${Math.floor(rgb[0]*255)},${Math.floor(rgb[1]*255)},${Math.floor(rgb[2]*255)})`;
    ctx.lineWidth = lineWidth;

    const w = canvas.width;
    const h = canvas.height;
    const p = Array.from({length:4}, () => [Math.random()*w, Math.random()*h]);

    ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    ctx.bezierCurveTo(p[1][0], p[1][1], p[2][0], p[2][1], p[3][0], p[3][1]);
    ctx.stroke();

    requestAnimationFrame(drawBezier);
  }

  drawBezier();

  window.stopBezierDemo = () => {
    running = false;
    canvas.remove();
    console.log("Bézier-Effekt gestoppt.");
  };

  console.log("Psychedelische Bézier-Kurven laufen. Stoppen mit window.stopBezierDemo()");
})();
