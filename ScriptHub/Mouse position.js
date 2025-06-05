(() => {
  const mouseBox = document.createElement('div');
  Object.assign(mouseBox.style, {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    padding: '8px 12px',
    background: '#111',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '14px',
    borderRadius: '6px',
    zIndex: 99999,
    boxShadow: '0 0 8px #000',
    pointerEvents: 'none',
  });
  mouseBox.textContent = 'x: --, y: --';
  document.body.appendChild(mouseBox);

  window.addEventListener('mousemove', e => {
    mouseBox.textContent = `x: ${e.clientX}, y: ${e.clientY}`;
  });
})();
