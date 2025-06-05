(() => {
  // Overlay-Element erstellen
  const fpsBox = document.createElement('div');
  Object.assign(fpsBox.style, {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '8px 12px',
    background: '#111',
    color: '#fff', // Weißer Text
    fontFamily: 'monospace',
    fontSize: '14px',
    borderRadius: '6px',
    zIndex: 99999,
    boxShadow: '0 0 8px #000',
    pointerEvents: 'none',
  });
  fpsBox.textContent = 'FPS: --';
  document.body.appendChild(fpsBox);

  // FPS-Messung starten
  let last = performance.now();
  let frames = 0;

  function update() {
    const now = performance.now();
    frames++;
    if (now - last >= 1000) {
      const fps = frames;
      fpsBox.textContent = `FPS: ${fps}`;
      frames = 0;
      last = now;
    }
    requestAnimationFrame(update);
  }

  update();
})();
