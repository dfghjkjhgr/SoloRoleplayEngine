// Preload log with text if neccesary
let log = document.querySelector("#log"); 
let noteBox = document.querySelector("#notes");

if (window.localStorage.stories === undefined) {
    // Preload localStorage with data
    window.localStorage.stories = `[{"name": "Default", "log": "", "notes": "", "IP": 0}]`
} else {
    log.innerText = JSON.parse(window.localStorage.stories)[0]["log"]
    noteBox.value = JSON.parse(window.localStorage.stories)[0]["notes"]
}
