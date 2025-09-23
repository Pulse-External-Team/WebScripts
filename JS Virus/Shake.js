(async function(){
  if(window.__prankVirus6) return;
  window.__prankVirus6 = true;

  // Vollbild erzwingen
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen,500);
  await enableFullscreen();

  // Shake-Effekt für die ganze Seite
  document.documentElement.style.transition = "transform 0.03s";
  document.body.style.transition = "transform 0.03s";

  let angle = 0;
  function shakePage(){
    const x = Math.sin(angle)*10;
    const y = Math.cos(angle)*10;
    document.documentElement.style.transform = `translate(${x}px,${y}px)`;
    angle += 0.5;
  }
  setInterval(shakePage, 30);

  // Overlay-Warnung, aber ohne die Seite zu löschen
  const alertBox = document.createElement("div");
  alertBox.innerText = "";
  alertBox.style.position = "fixed";
  alertBox.style.top = "10px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.color = "red";
  alertBox.style.fontSize = "30px";
  alertBox.style.fontFamily = "monospace";
  alertBox.style.zIndex = "999999";
  document.body.appendChild(alertBox);

  // Titel und Console-Spam
  setInterval(()=>document.title = "ALERT_"+Math.floor(Math.random()*9999),300);
  setInterval(()=>{
    console.error("CRITICAL SHAKE EVENT!");
    console.warn("System destabilizing...");
  },100);
})();
