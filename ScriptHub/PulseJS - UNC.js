(() => {
    // Test results tracking
    let totalTests = 0;
    let passedTests = 0;
    const results = [];
    
    // Helper function to print test results
    function printResult(testName, success, category) {
        totalTests++;
        if (success) {
            passedTests++;
            console.log(`🟢 [${category}] ${testName} passed!`);
            results.push({test: testName, passed: true, category});
        } else {
            console.log(`🔴 [${category}] ${testName} failed!`);
            results.push({test: testName, passed: false, category});
        }
    }

    // ===== Kategorien ===== //
    function testBasicJS() {
        const category = "Basic JS";
        console.log(`\n🔧 ${category}`);
        printResult("Console Output", (() => {
            try { console.log("test"); return true; } catch (e) { return false; }
        })(), category);
        
        printResult("Type Checking", typeof "test" === "string", category);
        printResult("Error Handling", (() => {
            try { throw new Error("test"); return true; } catch (e) { return true; }
        })(), category);
        printResult("JSON Functions", (() => {
            try { return JSON.parse(JSON.stringify({x: 1})).x === 1; } catch (e) { return false; }
        })(), category);
        printResult("Array Functions", [1,2].map(x => x*2).join() === "2,4", category);
        printResult("Math Functions", Math.abs(Math.PI - 3.1415) < 0.01, category);
        printResult("String Functions", "test".includes("es"), category);
        printResult("Date Handling", new Date("2023-01-01").getFullYear() === 2023, category);
    }

    function testBrowserAPIs() {
        const category = "Browser APIs";
        console.log(`\n🌐 ${category}`);
        printResult("DOM Manipulation", (() => {
            try {
                const div = document.createElement("div");
                document.body.appendChild(div);
                const found = document.querySelector("div");
                document.body.removeChild(div);
                return !!found;
            } catch (e) { return false; }
        })(), category);
        
        printResult("Event Handling", (() => {
            try {
                let fired = false;
                document.addEventListener("__test__", () => fired = true);
                document.dispatchEvent(new Event("__test__"));
                return fired;
            } catch (e) { return false; }
        })(), category);
        
        printResult("Fetch API", typeof fetch === "function", category);
        printResult("WebSocket", typeof WebSocket === "function", category);
        printResult("Canvas API", (() => {
            try { return !!document.createElement("canvas").getContext("2d"); } catch (e) { return false; }
        })(), category);
        printResult("WebGL", (() => {
            try {
                const canvas = document.createElement("canvas");
                return !!canvas.getContext("webgl") || !!canvas.getContext("experimental-webgl");
            } catch (e) { return false; }
        })(), category);
        printResult("Geolocation", "geolocation" in navigator, category);
        printResult("Notifications", "Notification" in window, category);
        printResult("Clipboard API", "clipboard" in navigator, category);
        printResult("History API", "history" in window, category);
    }

    function testStorage() {
        const category = "Storage";
        console.log(`\n💾 ${category}`);
        printResult("LocalStorage", (() => {
            try { localStorage.setItem("test", "1"); return true; } catch (e) { return false; }
        })(), category);
        printResult("SessionStorage", (() => {
            try { sessionStorage.setItem("test", "1"); return true; } catch (e) { return false; }
        })(), category);
        printResult("IndexedDB", (() => {
            try { return !!window.indexedDB; } catch (e) { return false; }
        })(), category);
        printResult("Cookies", (() => {
            try { document.cookie = "test=1"; return true; } catch (e) { return false; }
        })(), category);
    }

    function testMedia() {
        const category = "Media";
        console.log(`\n🎥 ${category}`);
        printResult("WebAudio API", (() => {
            try { return !!window.AudioContext || !!window.webkitAudioContext; } catch (e) { return false; }
        })(), category);
        printResult("Video Element", (() => {
            try { return !!document.createElement("video").canPlayType; } catch (e) { return false; }
        })(), category);
        printResult("Microphone Access", (() => {
            return "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;
        })(), category);
        printResult("WebRTC", (() => {
            return "RTCPeerConnection" in window;
        })(), category);
    }

    function testAdvancedJS() {
        const category = "Advanced JS";
        console.log(`\n🚀 ${category}`);
        printResult("Proxy API", (() => {
            try { return new Proxy({}, {}); } catch (e) { return false; }
        })(), category);
        printResult("Web Workers", typeof Worker === "function", category);
        printResult("SharedArrayBuffer", typeof SharedArrayBuffer === "function", category);
        printResult("BigInt", typeof BigInt(123) === "bigint", category);
        printResult("WeakMap/WeakSet", (() => {
            try { return new WeakMap() && new WeakSet(); } catch (e) { return false; }
        })(), category);
        printResult("Atomics", typeof Atomics === "object", category);
    }

    function testTamperMonkey() {
        const category = "Tampermonkey";
        console.log(`\n🐵 ${category}`);
        printResult("GM_getValue/setValue", typeof GM_getValue === "function", category);
        printResult("GM_xmlhttpRequest", typeof GM_xmlhttpRequest === "function", category);
        printResult("GM_info", typeof GM_info === "object", category);
        printResult("GM_download", typeof GM_download === "function", category);
        printResult("GM_registerMenuCommand", typeof GM_registerMenuCommand === "function", category);
        printResult("unsafeWindow", typeof unsafeWindow !== "undefined", category);
    }

    function testSecurity() {
        const category = "Security";
        console.log(`\n🔒 ${category}`);
        printResult("CORS Enforcement", (() => {
            try { fetch("https://example.com"); return false; } catch (e) { return true; }
        })(), category);
        printResult("CSP Block eval", (() => {
            try { eval("1+1"); return false; } catch (e) { return true; }
        })(), category);
        printResult("HTTPS Enforcement", location.protocol === "https:", category);
    }

    function testExoticAPIs() {
        const category = "Exotic APIs";
        console.log(`\n🦄 ${category}`);
        printResult("WebAssembly", typeof WebAssembly === "object", category);
        printResult("Service Workers", "serviceWorker" in navigator, category);
        printResult("WebUSB", "usb" in navigator, category);
        printResult("WebVR/WebXR", (() => {
            return "getVRDisplays" in navigator || "xr" in navigator;
        })(), category);
        printResult("Speech Synthesis", "speechSynthesis" in window, category);
        printResult("Bluetooth API", "bluetooth" in navigator, category);
    }

    // ===== Hauptausführung ===== //
    console.log("Starting Ultimate JavaScript Environment Test");
    console.log("=============================================");
    
    testBasicJS();
    testBrowserAPIs();
    testStorage();
    testMedia();
    testAdvancedJS();
    testTamperMonkey();
    testSecurity();
    testExoticAPIs();
    
    console.log("=============================================");
    console.log("🏁 Test Completed! 🏁");
    console.log(`📊 Final Score: ${passedTests}/${totalTests} tests passed (${Math.floor((passedTests/totalTests)*100)}%)`);
    
    // Detailed Summary
    console.log("\n📜 Detailed Results:");
    const categories = [...new Set(results.map(r => r.category))];
    categories.forEach(cat => {
        const catTests = results.filter(r => r.category === cat);
        const passed = catTests.filter(t => t.passed).length;
        console.log(`  ${cat}: ${passed}/${catTests.length} passed`);
    });

    // Return results for programmatic use
    return {
        totalTests,
        passedTests,
        percentage: Math.floor((passedTests/totalTests)*100),
        isTamperMonkey: typeof GM_getValue === "function",
        results
    };
})();
