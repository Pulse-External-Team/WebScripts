(async function () {
  if (window.__fakeBlock) return;
  window.__fakeBlock = true;

  // Overlay Styles
  const style = document.createElement("style");
  style.textContent = `
    .fake-block-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw;
      height: 100vh;
      background: black;
      color: red;
      font-family: "Courier New", monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      text-align: center;
      animation: flicker 1.5s infinite;
      cursor: none;
    }
    .fake-block-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
    .fake-block-text {
      font-size: 1.3rem;
      max-width: 700px;
      line-height: 1.4;
    }
    @keyframes flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
      20%, 24%, 55% { opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "fake-block-overlay";
  overlay.innerHTML = `
    <div class="fake-block-title">⚠ SYSTEM ALERT ⚠</div>
    <div class="fake-block-text">
      Your device has been <span style="color:white;">BLOCKED</span> due to suspicious activity.<br><br>
      Please contact system administrator immediately.<br>
      <span style="font-size:0.9rem; color:#aaa;">Error Code: 0xDEAD-1337</span>
    </div>
  `;
  document.body.appendChild(overlay);

  // Funktion, um Fullscreen zu aktivieren
  async function enableFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}
  }

  // Direkt Fullscreen aktivieren
  await enableFullscreen();

  // ESC entfernt Overlay und Fullscreen
  window.addEventListener("keydown", async (e) => {
    if (e.key === "Escape") {
      overlay.remove();
      if (document.fullscreenElement) await document.exitFullscreen();
      window.__fakeBlock = false;
    }
  });

  // Fullscreen-Überwachung: wenn raus, wieder rein
  setInterval(enableFullscreen, 500);

  // Popup-Erstellungsfunktion
  function createPopup() {
    const w = 300 + Math.floor(Math.random() * 200);
    const h = 150 + Math.floor(Math.random() * 150);
    let left = Math.floor(Math.random() * (window.screen.width - w));
    let top = Math.floor(Math.random() * (window.screen.height - h));
    
    const popup = window.open("", "SYSTEM ALERT", `width=${w},height=${h},left=${left},top=${top}`);
    if (!popup) return;

    popup.document.write(`
      <body style="margin:0; background:black; color:red; font-family:monospace; display:flex; align-items:center; justify-content:center; height:100vh; text-align:center; overflow:hidden;">
        <div>
          ⚠ ALERT ⚠<br>
          Your device has been <span style="color:white;">BLOCKED</span>!<br>
          <span style="font-size:0.8rem;">Error 0xDEAD</span>
        </div>
      </body>
    `);
    popup.document.title = "SYSTEM ALERT";
    popup.document.close();

    let dx = Math.random() < 0.5 ? 2 : -2;
    let dy = Math.random() < 0.5 ? 2 : -2;

    setInterval(() => {
      try {
        if (!popup.closed) {
          left += dx;
          top += dy;
          let bounced = false;
          if (left < 0 || left + w > screen.width) { dx *= -1.1; bounced = true; }
          if (top < 0 || top + h > screen.height) { dy *= -1.1; bounced = true; }
          if (bounced) createPopup(); // Neues Popup bei Rand
          popup.moveTo(left, top);
        }
      } catch(e) {}
    }, 30);
  }

  // Direkt beim Laden ein erstes Popup
  createPopup();

  // Klick erzeugt neue Popups
  document.addEventListener("click", createPopup);

  // Automatisch alle 3 Sekunden ein neues Popup
  setInterval(createPopup, 3000);

})();
