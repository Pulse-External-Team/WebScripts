(async function(){
  if(window.__ultimateHorror) return;
  window.__ultimateHorror = true;

  // Vollbild erzwingen
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen, 500);
  await enableFullscreen();

  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.transition = "background 0.1s";
  document.documentElement.style.transition = "transform 0.05s";

  // Bildschirm flackern
  setInterval(()=>{
    document.body.style.background = Math.random() < 0.5 ? "black" : "darkred";
  }, 200);

  // Titel Chaos
  const horrorTitles = ["RUN...","I AM WATCHING","HORROR MODE","0xDEAD","THEY ARE HERE"];
  setInterval(()=>document.title = horrorTitles[Math.floor(Math.random()*horrorTitles.length)], 700);

  // Mausverfolgung Geisterspuren
  document.addEventListener("mousemove", e=>{
    const ghost = document.createElement("div");
    ghost.style.position = "absolute";
    ghost.style.left = e.pageX+"px";
    ghost.style.top = e.pageY+"px";
    ghost.style.width = ghost.style.height = "20px";
    ghost.style.borderRadius = "50%";
    ghost.style.background = ["#FF0000","#990000","#550000"][Math.floor(Math.random()*3)];
    ghost.style.opacity = "0.6";
    ghost.style.zIndex = "999999";
    ghost.style.pointerEvents = "none";
    ghost.style.transition = "all 0.5s ease-out";
    document.body.appendChild(ghost);
    setTimeout(()=>ghost.remove(), 1500);
  });

  // Zufällige unheimliche Textmeldungen
  function spawnMessage(){
    const msgs = ["I AM WATCHING","DON'T LOOK BACK","RUN","YOU'RE ALONE","THEY SEE YOU","MOMO IS HERE"];
    const msg = document.createElement("div");
    msg.innerText = msgs[Math.floor(Math.random()*msgs.length)];
    msg.style.position="absolute";
    msg.style.left = Math.random()*window.innerWidth+"px";
    msg.style.top = Math.random()*window.innerHeight+"px";
    msg.style.fontFamily = "monospace";
    msg.style.fontSize = "24px";
    msg.style.color = ["red","white","gray"][Math.floor(Math.random()*3)];
    msg.style.zIndex = "999999";
    document.body.appendChild(msg);
    setTimeout(()=>msg.remove(), 3000);
  }
  setInterval(spawnMessage, 1500);

  // Horror-Figuren / Momo Popups
  const horrorImages = [
    "https://static.kino.de/1f/ea/bb/de5f3c829957f0f4e28646c760_ZmMgODAwMDgwMDBmZmZmIDE2ODAgOTQ0AzFhZGY4OWY0ODY2.jpeg",
    "https://www.kreiszeitung.de/assets/images/1/502/1502320-514790-momo-challenge-hoax-whatsapp-horrorfilm-gruselfratze-2uQIjHSgavec.jpg"
  ];
  function spawnPopup(){
    const img = horrorImages[Math.floor(Math.random()*horrorImages.length)];
    const w = window.open("", "", "width=300,height=300");
    if(!w) return;
    w.document.write(`<body style='margin:0;overflow:hidden;background:black;'><img src='${img}' style='width:100%;height:100%;object-fit:cover;'></body>`);
    setTimeout(()=>{try{w.close();}catch(e){}}, 4000);
  }
  setInterval(spawnPopup, 5000);

  // Seite leicht wackeln
  let angle = 0;
  setInterval(()=>{
    angle += Math.random()*2-1;
    const x = Math.sin(angle)*5;
    const y = Math.cos(angle)*5;
    document.documentElement.style.transform = `translate(${x}px,${y}px) rotate(${angle/5}deg)`;
  },50);

  // Console Spam
  setInterval(()=>{
    console.error("ENTITY DETECTED 0x"+Math.floor(Math.random()*9999).toString(16));
    console.warn("Something moved in shadows");
    console.log("heartbeat", Date.now());
  },150);

})();
