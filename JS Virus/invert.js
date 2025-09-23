(() => {
  // Fullscreen Canvas für Invertierung
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // html2canvas für Screenshot der Seite
  const loadHtml2Canvas = async () => {
    if (!window.html2canvas) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
  };

  let running = true;

  const invertLoop = async () => {
    await loadHtml2Canvas();

    while (running) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const snap = await html2canvas(document.body, { backgroundColor: null, scale: window.devicePixelRatio || 1 });
      ctx.drawImage(snap, 0, 0);

      // Farben invertieren
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // R
        data[i + 1] = 255 - data[i+1]; // G
        data[i + 2] = 255 - data[i+2]; // B
        // Alpha unverändert
      }
      ctx.putImageData(imgData, 0, 0);

      await new Promise(r => setTimeout(r, 200)); // 0.2s Pause
    }
  };

  invertLoop();

  window.stopInvertColors = () => {
    running = false;
    canvas.remove();
    console.log("Farben-Invertierung gestoppt.");
  };

  console.log("Farben der Seite werden invertiert. Stoppen mit window.stopInvertColors()");
})();
