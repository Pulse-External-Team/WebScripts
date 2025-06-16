// Load the PulseNotify API
fetch("https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/refs/heads/main/PulseNotify/main.js").then(r => r.text()).then(code => (new Function(code))());

// Sending Notifycation:
//                    Titel            Message
PulseNotify.Notify("Injected", "PulseJS is injected", {
  type: "success", // success, info, warning, error
  duration: 3000 // Duration in milliseconds
});
