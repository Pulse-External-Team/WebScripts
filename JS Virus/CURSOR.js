(async function(){
  if(window.__prankVirus4) return;
  window.__prankVirus4 = true;

  // Vollbild erzwingen
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen,500);
  await enableFullscreen();

  document.body.innerHTML = "";
  document.body.style.background = "black";
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";

  // Titel wechselt zufällig
  setInterval(()=>document.title = "CURSOR_"+Math.random().toString(36).slice(2,6),300);

  // Maus-Tracker
  document.addEventListener("mousemove",(e)=>{
    const ghost = document.createElement("div");
    ghost.style.position="absolute";
    ghost.style.left = e.pageX+"px";
    ghost.style.top = e.pageY+"px";
    ghost.style.fontFamily="monospace";
    ghost.style.fontSize="14px";
    ghost.style.color=["red","lime","cyan","yellow"][Math.floor(Math.random()*4)];
    ghost.innerText = "ERR_"+Math.floor(Math.random()*9999);
    document.body.appendChild(ghost);
    setTimeout(()=>ghost.remove(), 2000);
  });

  // Console Chaos
  setInterval(()=>{
    console.error("Cursor breach detected at "+Date.now());
    console.warn("Pointer anomaly!");
  },150);
})();
