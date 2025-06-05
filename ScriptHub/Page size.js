(() => {
  const sizeBox = document.createElement('div');
  Object.assign(sizeBox.style, {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
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
  document.body.appendChild(sizeBox);

  function updateSize() {
    sizeBox.textContent = `${window.innerWidth} x ${window.innerHeight}`;
  }

  window.addEventListener('resize', updateSize);
  updateSize();
})();
