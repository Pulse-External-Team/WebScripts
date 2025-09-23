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

  const snap = await html2canvas(document.body, { backgroundColor: null, scale: 1 });
  const canvas = document.createElement("canvas");
  canvas.width = snap.width;
  canvas.height = snap.height;
  canvas.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(snap, 0, 0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const w = canvas.width;
  const h = canvas.height;

  function loop() {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const xorVal = x ^ y;

        data[idx] = (data[idx] + xorVal) & 0xFF;       // R
        data[idx + 1] = (data[idx + 1] + xorVal) & 0xFF; // G
        data[idx + 2] = (data[idx + 2] + xorVal) & 0xFF; // B
        // Alpha bleibt unverändert
      }
    }
    ctx.putImageData(imgData, 0, 0);
    requestAnimationFrame(loop);
  }

  loop();

  window.stopFractalGlitch = () => {
    canvas.remove();
    console.log("Fractal-Glitch gestoppt.");
  };

  console.log("Fractal-Glitch läuft. Stoppen mit window.stopFractalGlitch()");
})();
