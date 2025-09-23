(async () => {
  // === Setup Canvas ===
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

  // === Screenshot der Seite ===
  if (!window.html2canvas) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  const snap = await html2canvas(document.body, { backgroundColor: null, scale: window.devicePixelRatio || 1 });

  // === Tunnel Variablen ===
  let scaleStep = 0.9;
  const tunnelDepth = 100;
  let stepsDrawn = 0;
  let running = true;

  let currentDelay = 50;   // Startgeschwindigkeit
  const minDelay = 1;      // Sehr schnell
  const speedUpFactor = 0.7; // Nach jedem Reset deutlich schneller

  // === Tunnel Schrittweise zeichnen ===
  function drawStep() {
    if (!running) return;

    if (stepsDrawn >= tunnelDepth) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Reset
      stepsDrawn = 0;
      currentDelay = Math.max(minDelay, currentDelay * speedUpFactor); // schneller beim Neustart
    }

    const alphaStep = 1 / tunnelDepth;
    const currentScale = scaleStep ** stepsDrawn;

    const w = snap.width * currentScale;
    const h = snap.height * currentScale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    // Zufällige Farbfilter
    ctx.filter = `brightness(1) sepia(1) hue-rotate(${Math.random()*360}deg) saturate(${Math.random()*3 + 0.5})`;
    ctx.globalAlpha = 1 - stepsDrawn * alphaStep;
    ctx.drawImage(snap, x, y, w, h);

    stepsDrawn++;
    setTimeout(drawStep, currentDelay);
  }

  drawStep();

  window.stopTunnelEffect = () => {
    running = false;
    canvas.remove();
    console.log("Tunnel-Effekt gestoppt.");
  };

  console.log("Tunnel-Effekt läuft extrem schnell. Stoppen mit window.stopTunnelEffect()");
})();
