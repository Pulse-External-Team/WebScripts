// == Beispiel: Nutzung der PulseExternal API == //
// Stelle sicher, dass PulseExternal.js vorher geladen ist.

(async () => {
    // Username ändern
    PulseExternal.api.SetUsername("PulseUser");

    // Cloudrechte aktivieren
    PulseExternal.api.ForceEnableCloud();

    // Sprite von URL laden
    await PulseExternal.api.InjectSpriteFromURL(
        "https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/main/WebScripts/Scratch/Cheats/sprite3/PulseLife%20%5Bv.0.0.1%5D.sprite3"
    );

    // Externes JavaScript laden und ausführen
    await PulseExternal.api.InjectJSFromURL(
        "https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/main/WebScripts/Scratch/test-script.js"
    );

    // Externes CSS laden
    await PulseExternal.api.InjectCSSFromURL(
        "https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/main/WebScripts/Scratch/styles/darkmode.css"
    );

    // JSON-Daten laden
    const data = await PulseExternal.api.LoadJSON(
        "https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/main/WebScripts/config.json"
    );
    console.log("Geladene Config:", data);

    // Inline-JS ausführen
    PulseExternal.api.InjectJS("console.log('Custom JS läuft!');");

    // Log-Test
    PulseExternal.api.Log("Beispielausführung abgeschlossen ✅");
})();
