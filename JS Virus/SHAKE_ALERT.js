(async function(){
  if(window.__prankVirus6) return;
  window.__prankVirus6 = true;

  async function enableFullscreen(){
    try { if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); } catch(e){}
  }
  setInterval(enableFullscreen,500);
  await enableFullscreen();

  document.body.innerHTML = "<div id='alert' style='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:red;font-size:40px;font-family:monospace;'>!!! SYSTEM ALERT !!!</div>";
  document.body.style.background="black";
  document.body.style.overflow="hidden";

  const alertBox = document.getElementById("alert");

  function shake(){
    const x = (Math.random()*20-10)+"px";
    const y = (Math.random()*20-10)+"px";
    alertBox.style.transform = `translate(-50%,-50%) translate(${x},${y})`;
  }
  setInterval(shake,50);

  setInterval(()=>document.title = "ALERT_"+Math.floor(Math.random()*9999),300);
  setInterval(()=>{
    console.error("Critical vibration event detected!");
    console.warn("Destabilization at sector "+Math.floor(Math.random()*1000));
  },100);
})();
