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

  function randomColorComponent() {
    return Math.floor(Math.random() * 256);
  }

  function drawTriangle() {
    const w = canvas.width;
    const h = canvas.height;

    for (let i = 0; i < 25; i++) {
      const x0 = Math.random() * w;
      const y0 = Math.random() * h;
      const x1 = Math.random() * w;
      const y1 = Math.random() * h;
      const x2 = Math.random() * w;
      const y2 = Math.random() * h;

      const grad = ctx.createLinearGradient(x0, y0, x2, y2);
      grad.addColorStop(0, `rgb(${randomColorComponent()},0,0)`);
      grad.addColorStop(0.5, `rgb(0,${randomColorComponent()},0)`);
      grad.addColorStop(1, `rgb(0,0,${randomColorComponent()})`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.fill();
    }
  }

  let running = true;
  function loop() {
    if (!running) return;
    drawTriangle();
    requestAnimationFrame(loop);
  }

  loop();

  window.stopGradientTriangles = () => {
    running = false;
    canvas.remove();
    console.log("Gradient-Dreiecke gestoppt.");
  };

  console.log("Psychedelische Gradient-Dreiecke laufen. Stoppen mit window.stopGradientTriangles()");
})();
