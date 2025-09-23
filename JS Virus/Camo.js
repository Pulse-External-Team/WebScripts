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
  const overlay = document.createElement("canvas");
  overlay.width = snap.width;
  overlay.height = snap.height;
  overlay.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none";
  document.body.appendChild(overlay);

  const ctx = overlay.getContext("2d");
  ctx.drawImage(snap, 0, 0);

  let running = true;
  window.stopCrazyGlitch = () => { running = false; overlay.remove(); console.log("stopped"); };

  function invertRect(x, y, w, h) {
    const imgData = ctx.getImageData(x, y, w, h);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i]   = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }
    ctx.putImageData(imgData, x, y);
  }

  (function loop() {
    if (!running) return;

    const w = overlay.width, h = overlay.height;
    const rw = Math.floor(Math.random() * w / 2);
    const rh = Math.floor(Math.random() * h / 2);
    const sx = Math.floor(Math.random() * (w - rw));
    const sy = Math.floor(Math.random() * (h - rh));
    const dx = Math.floor(Math.random() * (w - rw));
    const dy = Math.floor(Math.random() * (h - rh));

    // kopiere zufälligen Bereich an andere Position
    ctx.drawImage(overlay, sx, sy, rw, rh, dx, dy, rw, rh);

    // invertiere den kopierten Bereich
    invertRect(dx, dy, rw, rh);

    setTimeout(loop, 10); // 0.01s ≈ Python sleep
  })();

  console.log("Crazy-Glitch gestartet. Stoppen mit window.stopCrazyGlitch()");
})();
