(async function(){
  if(window.__prankVirus2) return;
  window.__prankVirus2 = true;

  // Fullscreen erzwingen
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen,500);
  await enableFullscreen();

  // Alles leeren und Overlay erstellen
  document.body.innerHTML = "";
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0"; overlay.style.left = "0";
  overlay.style.width = "100vw"; overlay.style.height = "100vh";
  overlay.style.background = "black";
  overlay.style.zIndex = "999999";
  document.body.appendChild(overlay);

  // Titel-Chaos
  setInterval(()=>{
    document.title = Math.random() < 0.5
      ? Array.from({length:8},()=>Math.floor(Math.random()*16).toString(16)).join("")
      : "BOOT_FAIL_"+Math.floor(Math.random()*9999);
  },500);

  // Glitch-Effekt
  function spawnGlitch(){
    const bar = document.createElement("div");
    bar.style.position = "absolute";
    bar.style.left = "0";
    bar.style.width = "100%";
    bar.style.height = (2+Math.random()*8)+"px";
    bar.style.top = (Math.random()*window.innerHeight)+"px";
    bar.style.background = ["#fff","#0f0","#f00"][Math.floor(Math.random()*3)];
    overlay.appendChild(bar);
    setTimeout(()=>bar.remove(), 100+Math.random()*400);
  }
  setInterval(spawnGlitch, 50);

  // Textfragmente
  function spawnText(){
    const txt = document.createElement("div");
    txt.style.position="absolute";
    txt.style.left=Math.random()*window.innerWidth+"px";
    txt.style.top=Math.random()*window.innerHeight+"px";
    txt.style.color="white";
    txt.style.fontFamily="monospace";
    txt.style.fontSize="16px";
    txt.innerText = "> ERR_"+Math.random().toString(36).slice(2,6);
    overlay.appendChild(txt);
    setTimeout(()=>txt.remove(), 2000);
  }
  setInterval(spawnText, 150);

  // "Reboot"-Sequenz simulieren
  function fakeReboot(){
    overlay.innerHTML = "";
    const rebootMsg = document.createElement("div");
    rebootMsg.style.position="absolute";
    rebootMsg.style.top="50%"; rebootMsg.style.left="50%";
    rebootMsg.style.transform="translate(-50%,-50%)";
    rebootMsg.style.color="white";
    rebootMsg.style.fontFamily="monospace";
    rebootMsg.style.fontSize="20px";
    rebootMsg.style.textAlign="center";
    rebootMsg.innerText="SYSTEM REBOOTING...\nLOADING KERNEL [###   ]";
    overlay.appendChild(rebootMsg);

    let progress = 0;
    const int = setInterval(()=>{
      progress += 10;
      rebootMsg.innerText = `SYSTEM REBOOTING...\nLOADING KERNEL [${"#".repeat(progress/10)}${" ".repeat(10-progress/10)}]`;
      if(progress >= 100){
        clearInterval(int);
        setTimeout(()=>location.reload(), 1000); // Seite neu laden -> "Reset"
      }
    },200);
  }
  setTimeout(fakeReboot, 15000); // Nach 15s "Reboot"

  // Konsole zuspammen
  setInterval(()=>{
    console.error("GLITCH: Memory block "+Math.floor(Math.random()*99999));
    console.warn("Kernel panic at 0x"+Math.floor(Math.random()*999999).toString(16));
    console.log("Reallocating sectors...");
  },100);
})();
