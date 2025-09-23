(async () => {
  // html2canvas laden
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
  const overlay = document.createElement("canvas");
  overlay.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none";
  overlay.width = snap.width;
  overlay.height = snap.height;
  document.body.appendChild(overlay);

  const ctx = overlay.getContext("2d");
  ctx.drawImage(snap, 0, 0);

  let running = true;
  window.stopMeltingDemo = () => { running = false; console.log("stopped"); overlay.remove(); };

  (function loop() {
    if (!running) return;
    const x = Math.floor(Math.random() * overlay.width);
    const slice = ctx.getImageData(x, 0, 10, overlay.height);
    ctx.putImageData(slice, x, 1); // um 1 Pixel nach unten verschieben
    requestAnimationFrame(loop);
  })();

  console.log("Melting gestartet. Stoppen mit window.stopMeltingDemo()");
})();
