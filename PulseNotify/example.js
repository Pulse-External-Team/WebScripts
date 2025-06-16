// 1. Loading API 
fetch('https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/refs/heads/main/PulseNotify/main.js').then(r => r.text()).then(eval);

// 2. Send Notifycation
PulseNotify.Notify(
  "Injected", // Titel
  "PulseJS is successfully injected",  // Message
  {
    imageUrl: "https://avatars.githubusercontent.com/u/174529763?v=4", // Image
    type: "info", // success, info, warning, error
    duration: 3000 // Duration in milliseconds
  }
);

