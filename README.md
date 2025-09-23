# PulseX & JavaScript Disclaimer

## Usage

**PulseJS - Web**

```javascript
fetch('https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/refs/heads/main/WebScripts/Scratch/Loader/PulseJS%20-%20UI/UI.js').then(r => r.text()).then(eval).c

```


**Tampermonkey**
```javascript
// ==UserScript==
// @name         PulseJS - Web
// @namespace    http://tampermonkey.net/
// @version      v2.5.0
// @description  Javascript executor with many funktions :)
// @author       PulseExternal
// @match        *://*/*
// @icon         https://avatars.githubusercontent.com/u/174529763?v=4
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    fetch('https://raw.githubusercontent.com/Pulse-External-Team/WebScripts/refs/heads/main/WebScripts/Scratch/Loader/PulseJS%20-%20UI/UI.js').then(r => r.text()).then(eval).c
})();

```
