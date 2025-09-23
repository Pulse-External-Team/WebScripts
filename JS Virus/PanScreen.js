(async () => {
  // Screenshot der Seite mit html2canvas
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

  let dx = 1, dy = 1;
  let angle = 0;
  const size = 1;
  const speed = 5;
  let running = true;

  function loop() {
    if (!running) return;

    dx = Math.ceil(Math.sin(angle) * size * 10);
    dy = Math.ceil(Math.cos(angle) * size * 10);
    angle += speed / 10;
    if (angle > Math.PI) angle = -Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(snap, dx, dy);

    requestAnimationFrame(loop);
  }

  loop();

  window.stopWobble = () => {
    running = false;
    canvas.remove();
    console.log("Wabernder Effekt gestoppt.");
  };

  console.log("Wabernder Desktop-Effekt (Webseite) gestartet. Stoppen mit window.stopWobble()");
})();
