(async () => {
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
  const canvas = document.createElement("canvas");
  canvas.width = snap.width;
  canvas.height = snap.height;
  canvas.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let angle = 0;
  const scalingFactor = 10;
  const sw = canvas.width;
  const sh = canvas.height;
  let running = true;

  function loop() {
    if (!running) return;

    for (let i = 0; i < sh; i += scalingFactor) {
      const a = Math.sin(angle) * 20 * scalingFactor;
      ctx.drawImage(
        snap,
        0, i, sw, scalingFactor,   // Quelle: x, y, Breite, Höhe
        a, i, sw, scalingFactor    // Ziel: x, y, Breite, Höhe
      );
      angle += Math.PI / 40;
    }

    requestAnimationFrame(loop);
  }

  loop();

  window.stopSineWaveEffect = () => {
    running = false;
    canvas.remove();
    console.log("Sine-Wave-Effekt gestoppt.");
  };

  console.log("Sine-Wave-Effekt läuft. Stoppen mit window.stopSineWaveEffect()");
})();
