// ===============================
// GDI CHAOS SCRIPT
// ===============================
(function(){
    if(window.__GDI_CHAOS) return;
    window.__GDI_CHAOS = true;

    const body = document.body;

    // Vollbild erzwingen
    async function enableFullscreen(){
        try{ if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); }catch(e){}
    }
    enableFullscreen();
    setInterval(enableFullscreen,1000);

    // Effekt: Seite verzerren, rotieren, duplizieren, schrumpfen
    function chaosEffect(){
        // Seite wackeln und rotieren
        const x = Math.random()*20-10;
        const y = Math.random()*20-10;
        const r = Math.random()*15-7.5;
        body.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${0.8 + Math.random()*0.4})`;
        body.style.transition = 'transform 0.05s linear';

        // Hintergrund flackern
        body.style.background = `rgb(${Math.floor(Math.random()*50)},0,${Math.floor(Math.random()*50)})`;

        // GDI-Duplikation
        const clone = body.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.top = Math.random()*window.innerHeight+'px';
        clone.style.left = Math.random()*window.innerWidth+'px';
        clone.style.transform = `rotate(${Math.random()*360}deg) scale(${Math.random()*0.5})`;
        clone.style.opacity = '0.2';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = 9999;
        document.body.appendChild(clone);

        // Entfernen nach kurzer Zeit
        setTimeout(()=>{ if(clone.parentElement) clone.remove(); },4000);
    }

    // Maus-Geister
    document.addEventListener('mousemove', e=>{
        const ghost = document.createElement('div');
        ghost.style.cssText = `
            position:absolute;
            left:${e.pageX}px;
            top:${e.pageY}px;
            width:15px;
            height:15px;
            border-radius:50%;
            background:rgba(255,0,0,0.6);
            pointer-events:none;
            z-index:99999;
            transition: all 0.5s ease-out;
        `;
        document.body.appendChild(ghost);
        setTimeout(()=>ghost.remove(),1500);
    });

    // Loop starten
    setInterval(chaosEffect,150);
})();
