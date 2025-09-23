(async function(){
  if(window.__prankVirus) return;
  window.__prankVirus = true;

  // Helper: Fullscreen dauerhaft aktivieren
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen,500);
  await enableFullscreen();

  // Common Overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0"; overlay.style.left = "0";
  overlay.style.width = "100vw"; overlay.style.height = "100vh";
  overlay.style.zIndex = "999999";
  overlay.style.overflow = "hidden";
  document.body.appendChild(overlay);

  /*** CRITICAL_OVERRUN ***/
  function criticalOverrun(){
    overlay.style.background="black";
    const flicker = document.createElement("div");
    flicker.style.position="absolute";
    flicker.style.top="0"; flicker.style.left="0";
    flicker.style.width="100%"; flicker.style.height="100%";
    flicker.style.color="red";
    flicker.style.fontFamily="monospace";
    flicker.style.fontSize="30px";
    flicker.style.display="flex";
    flicker.style.alignItems="center";
    flicker.style.justifyContent="center";
    flicker.innerText="CRITICAL OVERRUN";
    overlay.appendChild(flicker);
    setInterval(()=>{ flicker.style.opacity=Math.random()<0.5?0.2:1; },100);

    setInterval(()=>{
      const span = document.createElement("span");
      span.style.position="absolute";
      span.style.left=Math.random()*window.innerWidth+"px";
      span.style.top=Math.random()*window.innerHeight+"px";
      span.style.color="red";
      span.style.fontSize="20px";
      span.innerText=String.fromCharCode(65+Math.floor(Math.random()*26));
      overlay.appendChild(span);
      setTimeout(()=>span.remove(),2000);
    },100);
  }

  /*** BLACKSCREEN_404 ***/
  function blackscreen404(){
    overlay.style.background="black";
    const text = document.createElement("div");
    text.style.position="absolute";
    text.style.top="50%"; text.style.left="50%";
    text.style.transform="translate(-50%,-50%)";
    text.style.color="white";
    text.style.fontSize="50px";
    text.style.fontFamily="monospace";
    text.style.textAlign="center";
    text.innerText="ERROR 404\nSYSTEM FAILURE";
    overlay.appendChild(text);
    setInterval(()=>{ text.style.opacity=Math.random()<0.5?0.2:1; },300);
  }

  /*** PANICCORE ***/
  function panicCore(){
    overlay.style.background="black";
    function createBox(){
      const box = document.createElement("div");
      box.style.position="absolute";
      box.style.width="50px"; box.style.height="50px";
      box.style.background=["red","orange","yellow"][Math.floor(Math.random()*3)];
      box.style.left=Math.random()*window.innerWidth+"px";
      box.style.top=Math.random()*window.innerHeight+"px";
      overlay.appendChild(box);
      let dx = (Math.random()<0.5?1: -1)*(1+Math.random()*2);
      let dy = (Math.random()<0.5?1: -1)*(1+Math.random()*2);
      const interval = setInterval(()=>{
        let left = parseFloat(box.style.left);
        let top = parseFloat(box.style.top);
        left+=dx; top+=dy;
        if(left<0||left+50>window.innerWidth) dx*=-1.1;
        if(top<0||top+50>window.innerHeight) dy*=-1.1;
        box.style.left=left+"px"; box.style.top=top+"px";
      },30);
    }
    setInterval(createBox,200);
  }

  /*** CONSOLE SPAM ***/
  function consoleSpam(){
    const msgs = [
      "Critical Error: 0x" + Math.floor(Math.random()*9999).toString(16),
      "Memory leak detected!",
      "Unauthorized script execution blocked.",
      "System core overheating!",
      "Fatal Exception at 0x"+Math.floor(Math.random()*999999).toString(16)
    ];
    setInterval(()=>{
      console.error(msgs[Math.floor(Math.random()*msgs.length)]);
      console.warn("Warning: "+Math.random().toString(36).slice(2,8));
      console.log("Log:", new Date().toISOString());
    }, 100);
  }

  /*** TITEL-SPAM MIT RANDOM STRINGS/IPs ***/
  function randomIP(){
    return Array.from({length:4},()=>Math.floor(Math.random()*256)).join(".");
  }
  function randomString(){
    return Math.random().toString(36).slice(2,10);
  }
  const randomTitles = [
    "SYSTEM ALERT", "PANIC MODE", "ERROR_X", "CRASH_CORE", "VIRAL.EXE", 
    "BLOCKED DEVICE", "FATAL ERROR", "INTRUSION DETECTED", "DEAD-X", "RED SCREEN"
  ];
  setInterval(()=>{
    const type = Math.random();
    if(type<0.3) document.title = randomString();
    else if(type<0.6) document.title = randomIP();
    else document.title = randomTitles[Math.floor(Math.random()*randomTitles.length)];
  }, 700);

  // Starte die 3 „Viren“ nacheinander
  criticalOverrun();
  setTimeout(blackscreen404,2000);
  setTimeout(panicCore,4000);
  setTimeout(consoleSpam,1000);

})();
