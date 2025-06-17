// Initialisiere PulseNotify nur einmal
if (!window.PulseNotifyLoaded) {
  window.PulseNotifyLoaded = fetch('https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/refs/heads/main/PulseNotify/main.js')
    .then(r => r.text())
    .then(code => {
      eval(code);
    });
}

// Funktion zum Anzeigen der Notification
function showNotification(title, message, options) {
  // Warten bis PulseNotify geladen ist (falls noch nicht geschehen)
  Promise.resolve(window.PulseNotifyLoaded).then(() => {
    if (typeof PulseNotify !== "undefined") {
      PulseNotify.Notify(title, message, options);
    } else {
      console.warn("PulseNotify nicht verfügbar.");
    }
  });
}

// Beispiel-Aufruf
PulseNotify.Notify(
  "Injected", // Titel
  "PulseJS is successfully injected",  // Message
  {
    imageUrl: "https://avatars.githubusercontent.com/u/174529763?v=4", // Image
    type: "info", // success, info, warning, error
    duration: 3000 // Duration in milliseconds
  }
);
