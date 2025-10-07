// == PulseExternal API == //
// Universelle Web-Scripting API für Scratch & Browser-Injection

const PulseExternal = {
    api: {
        // === [Intern] Scratch VM abrufen ===
        getVM() {
            try {
                let wpRequire;
                webpackChunkGUI.push([[Symbol()], {}, function (require) { wpRequire = require }]);
                const vm = wpRequire(
                    Object.keys(wpRequire.m)[
                        Object.values(wpRequire.m).findIndex(m => m.toString().includes("guiInitialState="))
                    ]
                ).guiInitialState.vm;
                if (!vm) throw new Error("VM konnte nicht gefunden werden.");
                return vm;
            } catch (e) {
                console.error("[PulseExternal] VM konnte nicht abgerufen werden:", e);
                return null;
            }
        },

        // === Sprite aus Datei hinzufügen ===
        async InjectSprite(file) {
            const vm = this.getVM();
            if (!vm) return;
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    try {
                        vm.addSprite(reader.result);
                        console.log(`[PulseExternal] Sprite erfolgreich injiziert (${file.name}).`);
                        resolve(true);
                    } catch (err) {
                        console.error("[PulseExternal] Fehler beim Hinzufügen des Sprites:", err);
                        reject(err);
                    }
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
        },

        // === Sprite von URL laden und einfügen ===
        async InjectSpriteFromURL(url) {
            const vm = this.getVM();
            if (!vm) return;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                const buffer = await response.arrayBuffer();
                await vm.addSprite(buffer);
                console.log(`[PulseExternal] Sprite von URL injiziert: ${url}`);
            } catch (e) {
                console.error("[PulseExternal] Fehler beim Laden des Sprites:", e);
            }
        },

        // === Cloudrechte erzwingen ===
        ForceEnableCloud() {
            try {
                ["hasCloudPermission", "canModifyCloudData"].forEach(prop => {
                    Object.defineProperty(Object.prototype, prop, {
                        get: () => true,
                        set: () => {},
                        enumerable: false
                    });
                });
                console.log(`[PulseExternal] Cloudrechte aktiviert.`);
            } catch (e) {
                console.error("[PulseExternal] Fehler beim Aktivieren der Cloudrechte:", e);
            }
        },

        // === Username ändern ===
        SetUsername(name) {
            const vm = this.getVM();
            if (!vm) return;
            vm.runtime._primitives.sensing_username = () => name;
            vm.runtime.ioDevices.userData._username = name;
            console.log(`[PulseExternal] Username geändert zu: "${name}"`);
        },

        // === Beliebigen JS-Code ausführen ===
        InjectJS(code) {
            try {
                const result = eval(code);
                console.log(`[PulseExternal] JS-Code ausgeführt.`);
                return result;
            } catch (e) {
                console.error(`[PulseExternal] Fehler beim Ausführen des JS-Codes:`, e);
            }
        },

        // === JS von URL laden und ausführen ===
        async InjectJSFromURL(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                const js = await response.text();
                const result = eval(js);
                console.log(`[PulseExternal] JS von ${url} erfolgreich ausgeführt.`);
                return result;
            } catch (e) {
                console.error(`[PulseExternal] Fehler beim Laden/Ausführen des JS von URL:`, e);
            }
        },

        // === JSON laden ===
        async LoadJSON(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                const data = await response.json();
                console.log(`[PulseExternal] JSON von ${url} geladen.`);
                return data;
            } catch (e) {
                console.error(`[PulseExternal] Fehler beim Laden von JSON:`, e);
                return null;
            }
        },

        // === CSS injizieren ===
        InjectCSS(css) {
            const style = document.createElement("style");
            style.textContent = css;
            document.head.appendChild(style);
            console.log("[PulseExternal] CSS injiziert.");
            return style;
        },

        // === CSS von URL laden und injizieren ===
        async InjectCSSFromURL(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                const css = await response.text();
                this.InjectCSS(css);
                console.log(`[PulseExternal] CSS von ${url} injiziert.`);
            } catch (e) {
                console.error(`[PulseExternal] Fehler beim Laden/Injizieren von CSS:`, e);
            }
        },

        // === Logging Utility ===
        Log(msg) {
            console.log(`[PulseExternal] ${msg}`);
        }
    }
};

window.PulseExternal = PulseExternal; // global verfügbar machen
console.log("[PulseExternal] API geladen.");
