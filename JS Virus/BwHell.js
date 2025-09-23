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
  overlay.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none;background:black";
  document.body.appendChild(overlay);

  const ctx = overlay.getContext("2d");
  ctx.drawImage(snap, 0, 0);

  let running = true;
  window.stopGlitchDemo = () => { running = false; overlay.remove(); console.log("stopped"); };

  (function loop() {
    if (!running) return;
    const dx = Math.floor(Math.random() * 7 - 3);
    const dy = Math.floor(Math.random() * 7 - 3);
    ctx.save();
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(overlay, dx, dy);
    ctx.restore();

    // invert colors
    const imgData = ctx.getImageData(0, 0, overlay.width, overlay.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i]   = 255 - data[i];   // R
      data[i+1] = 255 - data[i+1]; // G
      data[i+2] = 255 - data[i+2]; // B
    }
    ctx.putImageData(imgData, 0, 0);

    requestAnimationFrame(loop);
  })();

  console.log("Glitch-Effekt gestartet. Stoppen mit window.stopGlitchDemo()");
})();
