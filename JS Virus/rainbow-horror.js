(async function(){
  if(window.__nightmarePrank) return;
  window.__nightmarePrank = true;

  // Vollbild erzwingen
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen, 500);
  await enableFullscreen();

  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.documentElement.style.transition = "transform 0.03s";
  document.body.style.transition = "background 0.05s";

  function randomColor(){
    return `hsl(${Math.floor(Math.random()*360)},100%,50%)`;
  }

  let chaosLevel = 1;
  let angle = 0;

  // Albtraum-Loop
  setInterval(()=>{
    // Bildschirm schütteln & drehen
    angle += chaosLevel * 5;
    const x = Math.sin(angle/10) * chaosLevel * 10;
    const y = Math.cos(angle/10) * chaosLevel * 10;
    document.documentElement.style.transform = `translate(${x}px,${y}px) rotate(${angle}deg)`;
    document.body.style.background = randomColor();

    // Titel und Konsole spammen
    document.title = ["!!! NIGHTMARE !!!", Math.random().toString(36).slice(2,8), `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`][Math.floor(Math.random()*3)];
    console.error("NIGHTMARE_ERR 0x"+Math.floor(Math.random()*999999).toString(16));
    console.warn("Chaos level:", chaosLevel);

    // Text-Glitch
    const nodes = document.body.querySelectorAll("*");
    if(nodes.length){
      const el = nodes[Math.floor(Math.random()*nodes.length)];
      if(el.childNodes.length){
        el.childNodes.forEach(n=>{
          if(n.nodeType===3 && n.textContent.length>2){
            n.textContent = n.textContent.split("").sort(()=>Math.random()-0.5).join("");
          }
        });
      }
    }

    // Bunte Kreise um den Bildschirm
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.width = circle.style.height = `${10+chaosLevel*5}px`;
    circle.style.borderRadius = "50%";
    circle.style.background = randomColor();
    circle.style.left = Math.random()*window.innerWidth+"px";
    circle.style.top = Math.random()*window.innerHeight+"px";
    circle.style.zIndex = "99999";
    circle.style.pointerEvents = "none";
    circle.style.opacity = "0.8";
    document.body.appendChild(circle);
    setTimeout(()=>circle.remove(), 1000);

    // Zufällige Popups
    if(Math.random() < chaosLevel*0.02){
      const w = window.open("", "", "width=300,height=200");
      if(w){
        w.document.write(`<body style='background:${randomColor()};color:white;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:18px;'>NIGHTMARE ${chaosLevel}</body>`);
        setTimeout(()=>{try{w.close();}catch(e){}}, 1500);
      }
    }

    // Chaos-Level eskalieren
    if(chaosLevel < 10){
      chaosLevel += 0.05;
    }

  }, 100);

})();
