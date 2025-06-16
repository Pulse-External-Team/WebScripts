// 1. Loading API 
fetch('https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/refs/heads/main/PulseNotify/main.js').then(r => r.text()).then(eval);

if (location.hostname !== "orteil.dashnet.org" || !location.pathname.includes("cookieclicker")) {
  PulseNotify.Notify(
    "Wrong site",
    "This cheat only works on https://orteil.dashnet.org/cookieclicker/",
    {
      imageUrl: "https://avatars.githubusercontent.com/u/174529763?v=4",
      type: "error",
      duration: 3000
    }
  );
  throw new Error("Not on the Cookie Clicker site");
}


// 2. Send Notification
PulseNotify.Notify(
  "Injected", // Titel
  "Cookie Clicker cheat is injected",  // Message
  {
    imageUrl: "https://avatars.githubusercontent.com/u/174529763?v=4", // Image
    type: "info", // success, info, warning, error
    duration: 3000 // Duration in milliseconds
  }
);

(() => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    #cheatWindow {
      position: fixed;
      top: 100px;
      left: 20px;
      width: 320px;
      min-width: 300px;
      min-height: 200px;
      background: #252526;
      color: #e0e0e0;
      font-family: 'Segoe UI', system-ui, sans-serif;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      z-index: 999999;
      display: flex;
      flex-direction: column;
      user-select: none;
      animation: fadeIn 0.3s ease forwards;
      overflow: hidden;
      border: 1px solid #3c3c3c;
      resize: both;
    }
    
    #cheatHeader {
      background: #2d2d30;
      padding: 12px 15px;
      font-weight: 600;
      font-size: 15px;
      cursor: cursor;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1e1e1e;
      user-select: none;
    }
    
    #cheatClose {
      background: transparent;
      border: none;
      color: #a0a0a0;
      font-size: 20px;
      cursor: pointer;
      padding: 0 6px 2px;
      border-radius: 4px;
      transition: all 0.2s;
      line-height: 1;
    }
    
    #cheatClose:hover {
      background: #e81123;
      color: white;
    }
    
    #cheatContent {
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      flex-grow: 1;
    }
    
    .cheatSection {
      background: #2d2d2d;
      border-radius: 6px;
      padding: 12px;
      border: 1px solid #3c3c3c;
    }
    
    .sectionTitle {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #4fa0ff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    #cookieInput {
      background: #333;
      border: 1px solid #444;
      color: #f0f0f0;
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 5px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
    }
    
    #buttonsWrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
    }
    
    #cheatContent button {
      background: #3a7bc8;
      border: none;
      color: white;
      padding: 8px 10px;
      font-size: 13px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
    }
    
    #cheatContent button:hover {
      background: #2d6bb8;
      transform: translateY(-1px);
    }
    
    #cheatContent button:active {
      transform: translateY(0);
    }
    
    .statusText {
      font-size: 12px;
      color: #aaa;
      margin-top: 8px;
      text-align: center;
    }
    
    /* Better resize handle */
    #cheatWindow::after {
      content: '';
      position: absolute;
      right: 2px;
      bottom: 2px;
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #3a7bc8 50%, transparent 50%);
      cursor: se-resize;
      pointer-events: none;
    }`;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "cheatWindow";
  container.innerHTML = `
    <div id="cheatHeader">
      <span>🍪 Cookie Cheat Hub</span>
      <button id="cheatClose">×</button>
    </div>
    <div id="cheatContent">
      <div class="cheatSection">
        <h3 class="sectionTitle">🔢 Basic Cheats</h3>
        <input type="number" id="cookieInput" placeholder="Cookie amount">
        <div id="buttonsWrapper">
          <button id="setCookies">Set</button>
          <button id="addCookies">Add</button>
          <button id="doubleCookies">Double</button>
          <button id="infiniteCookies">∞ Infinite</button>
        </div>
      </div>
      
      <div class="cheatSection">
        <h3 class="sectionTitle">⚡ Quick Actions</h3>
        <div id="buttonsWrapper">
          <button id="ruinFun">💥 Ruin Fun</button>
          <button id="openSesame">🛠️ Debug Menu</button>
          <button id="unlockAllUpgrades">⬆️ All Upgrades</button>
          <button id="unlockAllAchievs">🏆 All Achievs</button>
        </div>
      </div>
      
      <div class="cheatSection">
        <h3 class="sectionTitle">🤖 Automation</h3>
        <div id="buttonsWrapper">
          <button id="autoClicker">Auto Click</button>
          <button id="spawnGoldenCookie">✨ Golden Cookie</button>
        </div>
        <p class="statusText" id="statusText">Ready to cheat!</p>
      </div>
    </div>`;
  document.body.appendChild(container);

  // Improved drag functionality
  const header = document.getElementById("cheatHeader");
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  header.addEventListener('mousedown', (e) => {
    if (e.target === header || e.target.tagName === 'SPAN') {
      isDragging = true;
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
      container.style.cursor = 'cursor';
      container.style.userSelect = 'none';
      e.preventDefault();
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    
    // Constrain to window bounds
    container.style.left = `${Math.max(0, Math.min(newX, window.innerWidth - container.offsetWidth))}px`;
    container.style.top = `${Math.max(0, Math.min(newY, window.innerHeight - container.offsetHeight))}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = '';
    container.style.userSelect = '';
  });

  // Native resize (works better than custom implementation)
  container.style.resize = 'both';
  container.style.overflow = 'hidden'; // Needed for resize to work

  // Close button
  document.getElementById("cheatClose").addEventListener('click', () => {
    container.remove();
    style.remove();
    PulseNotify.Notify(
      "Closed", 
      "Cheat menu was closed", 
      {
        imageUrl: "https://avatars.githubusercontent.com/u/174529763?v=4",
        type: "info",
        duration: 2000
      }
    );
  });

  // Status updates
  const updateStatus = (text, isError = false) => {
    const status = document.getElementById("statusText");
    status.textContent = text;
    status.style.color = isError ? '#ff6b6b' : '#aaa';
    setTimeout(() => {
      status.textContent = 'Ready to cheat!';
      status.style.color = '#aaa';
    }, 3000);
  };

  // Cheat functions
  const getGame = () => (typeof Game === "object" && "cookies" in Game) ? Game : null;
  const input = document.getElementById("cookieInput");

  document.getElementById("setCookies").addEventListener('click', () => {
    const G = getGame();
    const v = parseInt(input.value);
    if (!G || isNaN(v)) {
      updateStatus("Invalid amount!", true);
      return;
    }
    G.cookies = v;
    G.cookiesEarned = v;
    updateStatus(`Set cookies to ${v.toLocaleString()}`);
    PulseNotify.Notify(
      "Cookies Set", 
      `Set to ${v.toLocaleString()} cookies`, 
      {
        type: "success",
        duration: 2000
      }
    );
  });

  document.getElementById("addCookies").addEventListener('click', () => {
    const G = getGame();
    const v = parseInt(input.value);
    if (!G || isNaN(v)) {
      updateStatus("Invalid amount!", true);
      return;
    }
    Game.Earn(v);
    updateStatus(`Added ${v.toLocaleString()} cookies`);
    PulseNotify.Notify(
      "Cookies Added", 
      `Added ${v.toLocaleString()} cookies`, 
      {
        type: "success",
        duration: 2000
      }
    );
  });

  document.getElementById("doubleCookies").addEventListener('click', () => {
    const G = getGame();
    if (!G) {
      updateStatus("Game not found!", true);
      return;
    }
    G.cookies *= 2;
    G.cookiesEarned = G.cookies;
    updateStatus(`Cookies doubled to ${G.cookies.toLocaleString()}`);
    PulseNotify.Notify(
      "Cookies Doubled", 
      `Now ${G.cookies.toLocaleString()} cookies`, 
      {
        type: "success",
        duration: 2000
      }
    );
  });

  document.getElementById("infiniteCookies").addEventListener('click', () => {
    const G = getGame();
    if (!G) {
      updateStatus("Game not found!", true);
      return;
    }
    G.cookies = Infinity;
    updateStatus("Cookies set to ∞ Infinity");
    PulseNotify.Notify(
      "Infinite Cookies", 
      "You now have ∞ cookies!", 
      {
        type: "success",
        duration: 2500
      }
    );
  });

  document.getElementById("ruinFun").addEventListener('click', () => {
    const G = getGame();
    if (!G || typeof G.RuinTheFun !== "function") {
      updateStatus("Feature not available", true);
      return;
    }
    G.RuinTheFun();
    updateStatus("RuinTheFun activated!");
    PulseNotify.Notify(
      "Fun Ruined", 
      "All upgrades & achievements unlocked!", 
      {
        type: "warning",
        duration: 3000
      }
    );
  });

  document.getElementById("openSesame").addEventListener('click', () => {
    const G = getGame();
    if (!G || typeof G.OpenSesame !== "function") {
      updateStatus("Debug menu not found", true);
      return;
    }
    G.OpenSesame();
    updateStatus("Debug menu unlocked");
    PulseNotify.Notify(
      "Debug Menu", 
      "Sesame menu activated", 
      {
        type: "info",
        duration: 2500
      }
    );
  });

  document.getElementById("unlockAllUpgrades").addEventListener('click', () => {
    const G = getGame();
    if (!G) {
      updateStatus("Game not found!", true);
      return;
    }
    G.SetAllUpgrade?.(1) || (G.UpgradesById.forEach(u => u.unlock(), u.bought = 1));
    updateStatus("All upgrades unlocked!");
    PulseNotify.Notify(
      "Upgrades Unlocked", 
      "All upgrades purchased", 
      {
        type: "success",
        duration: 2500
      }
    );
  });

  document.getElementById("unlockAllAchievs").addEventListener('click', () => {
    const G = getGame();
    if (!G) {
      updateStatus("Game not found!", true);
      return;
    }
    G.SetAllAchievs?.(1) || G.AchievementsById.forEach(a => a.won = 1);
    updateStatus("All achievements unlocked!");
    PulseNotify.Notify(
      "Achievements Unlocked", 
      "All achievements earned", 
      {
        type: "success",
        duration: 2500
      }
    );
  });

  let clickerInterval = null;
  document.getElementById("autoClicker").addEventListener('click', function() {
    const G = getGame();
    if (!G) {
      updateStatus("Game not found!", true);
      return;
    }
    
    if (clickerInterval) {
      clearInterval(clickerInterval);
      clickerInterval = null;
      this.textContent = "Auto Click";
      updateStatus("Auto-clicker stopped");
      PulseNotify.Notify(
        "Auto-Clicker", 
        "Auto-clicking stopped", 
        {
          type: "info",
          duration: 2000
        }
      );
    } else {
      clickerInterval = setInterval(() => G.ClickCookie(), 10);
      this.textContent = "🟢 Auto Click";
      updateStatus("Auto-clicker started (10ms)");
      PulseNotify.Notify(
        "Auto-Clicker", 
        "Auto-clicking started", 
        {
          type: "success",
          duration: 2000
        }
      );
    }
  });

  document.getElementById("spawnGoldenCookie").addEventListener('click', () => {
    const G = getGame();
    if (!G || !G.shimmers || !G.shimmers.length) {
      updateStatus("Golden cookies not available", true);
      return;
    }
    
    if (typeof G.GoldenCookie === "function") {
      G.GoldenCookie();
      updateStatus("Golden cookie spawned!");
      PulseNotify.Notify(
        "Golden Cookie", 
        "Spawned a golden cookie", 
        {
          type: "success",
          duration: 2000
        }
      );
    } else if (G.shimmers && G.shimmers.push) {
      G.shimmers.push(new G.shimmers[0].constructor());
      updateStatus("Golden cookie spawned!");
      PulseNotify.Notify(
        "Golden Cookie", 
        "Spawned a golden cookie", 
        {
          type: "success",
          duration: 2000
        }
      );
    } else {
      updateStatus("Failed to spawn", true);
    }
  });

  console.log("🍪 Cookie Cheat Hub successfully loaded!");
})();
