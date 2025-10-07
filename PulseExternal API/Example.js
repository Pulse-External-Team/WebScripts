(async () => {
    try {
        console.log("=== PulseExternal API Example ===");

        // ----------------------------
        // External API functions
        // ----------------------------

        // 1. Log a message
        // Explanation: Write a message to the console.
        PulseExternal.external.Log("This is a log message using PulseExternal.external.Log()");

        // 2. Inject sprite from a local file
        // Explanation: Adds a .sprite3 file from your computer to Scratch.
        // Example: Uncomment and provide a File object from an <input type="file"> to test
        // const fileInput = document.createElement("input");
        // fileInput.type = "file";
        // fileInput.onchange = async () => {
        //     const file = fileInput.files[0];
        //     await PulseExternal.external.InjectSprite(file);
        // };
        // fileInput.click();

        // 3. Inject sprite from URL
        // Explanation: Downloads a .sprite3 file from a URL and injects it into Scratch.
        await PulseExternal.external.InjectSpriteFromURL(
            "https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/main/WebScripts/Scratch/Cheats/sprite3/PulseLife%20%5Bv.0.0.1%5D.sprite3"
        );

        // 4. Inject inline JS
        // Explanation: Executes custom JavaScript directly.
        PulseExternal.external.InjectJS("console.log('Inline JS executed using PulseExternal.external.InjectJS()');");

        // 5. Inject JS from URL
        // Explanation: Loads and executes JavaScript from an external URL.
        await PulseExternal.external.InjectJSFromURL(
            "https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/main/WebScripts/Scratch/test-script.js"
        );

        // 6. Print all Scratch variables in the console
        // Explanation: Displays all current variables for the first target.
        PulseExternal.external.printAllGlobals();

        // 7. Print all broadcast events in the console
        // Explanation: Lists all registered broadcast events in Scratch.
        PulseExternal.external.printAllBroadcasts();

        // ----------------------------
        // Internal API functions
        // ----------------------------

        // 8. Set username
        // Explanation: Changes the Scratch username for the current session.
        PulseExternal.internal.SetUsername("PulseUser");

        // 9. Enable cloud permissions
        // Explanation: Forces cloud data permissions to true.
        PulseExternal.internal.ForceEnableCloud();

        // 10. Change a variable
        // Explanation: Updates the value of a variable, including cloud variables.
        PulseExternal.internal.setGlobal("exampleVariable", 42);

        // 11. Broadcast a message
        // Explanation: Sends a broadcast event in Scratch.
        PulseExternal.internal.broadcast("startEvent");

        // 12. Disable cloud permissions
        // Explanation: Resets cloud permissions back to default.
        PulseExternal.internal.ForceDisableCloud();

        PulseExternal.external.Log("=== Example execution complete ✅ ===");

    } catch (e) {
        PulseExternal.external.Log("Error during example execution: " + e);
        console.error(e);
    }
})();
