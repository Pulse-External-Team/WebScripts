(() => {
  const timeBox = document.createElement('div');
  Object.assign(timeBox.style, {
    position: 'fixed',
    top: '10px',
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
  document.body.appendChild(timeBox);

  function updateTime() {
    const now = new Date();
    timeBox.textContent = now.toLocaleTimeString();
  }

  setInterval(updateTime, 1000);
  updateTime();
})();
