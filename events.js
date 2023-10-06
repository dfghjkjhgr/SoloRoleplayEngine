var roller = new rpgDiceRoller.DiceRoller();
import { generate, count } from "./lib/random_words.min.js";
import { addInterventionPoint, changeInterventionIfNeccesary, oracle, twane, interventions } from "./oracle.js";
let interventionPoints = 0;


let greater = (x, y) => x > y ? x : y;
let lesser = (x, y) => x > y ? y : x;

let log = document.querySelector("#log"); 
let noteBox = document.querySelector("#notes");

function appendToLog(text) { 
    log.innerText += text;
    let stories = JSON.parse(window.localStorage.stories);
    stories[0].log += text
    window.localStorage.stories = JSON.stringify(stories)
}

document.querySelector("#oracle-fiftyfifty").addEventListener("click", function () {
    let oracleResult = Math.floor(Math.random() * 6); // Generate random number between 1 and 6 to use in oracle
    interventionPoints = addInterventionPoint(oracleResult, interventionPoints); // Add intervention points if needed
    appendToLog(`${oracle[oracleResult]}${changeInterventionIfNeccesary(interventionPoints)} \n\n`)
    if (interventionPoints >= 3) interventionPoints = 0; 
})

document.querySelector("#oracle-unlikely").addEventListener("click", function () {
    let oracleResult1 = Math.floor(Math.random() * 6);
    interventionPoints = addInterventionPoint(oracleResult1, interventionPoints);
    let oracleResult2 = Math.floor(Math.random() * 6)
    interventionPoints = addInterventionPoint(oracleResult2, interventionPoints);
    appendToLog(`${oracle[lesser(oracleResult1, oracleResult2)]}${changeInterventionIfNeccesary()}\n\n`);
    if (interventionPoints >= 3) interventionPoints = 0; 
})

document.querySelector("#oracle-likely").addEventListener("click", function () {
    let oracleResult1 = Math.floor(Math.random() * 6)
    interventionPoints = addInterventionPoint(oracleResult1, interventionPoints)
    let oracleResult2 = Math.floor(Math.random() * 6)
    interventionPoints = addInterventionPoint(oracleResult2, interventionPoints)
    appendToLog(`${oracle[greater(oracleResult1, oracleResult2)]}\n\n`)
})

document.querySelector("#roll-button").addEventListener("click", function () {
    try {
        roller.roll(document.querySelector("#roll-input").value).output;
    } catch (SyntaxError) {
        document.querySelector("#error-text").innerText = " ! Invalid notation";
        return;
    }
    appendToLog(`${roller.roll(document.querySelector("#roll-input").value).output}\n\n`);
    // Erase invalid notation error on correction
    document.querySelector("#error-text").innerText = "";
    
})

document.querySelector("#note-button").addEventListener("click", function () {
    if (noteBox.style.visibility == "visible") {
        noteBox.style.visibility = "hidden";
        document.querySelector("#note-button").innerText = "NOTES";
    } else {
        document.querySelector("#notes").style.visibility = "visible";
        document.querySelector("#note-button").innerText = "CLOSE NOTES";
        let stories = JSON.parse(window.localStorage.stories);
        stories[0].notes = document.querySelector("#notes").value;
        window.localStorage.stories = JSON.stringify(stories);
    }
    
})

document.querySelector("#portent-button").addEventListener("click", () => appendToLog(`${generate({exactly: 2, join: " "})}\n\n`))
document.querySelector("#twane").addEventListener("click", () => appendToLog(`${twane[Math.floor(Math.random() * 9)]}\n\n`))
document.querySelector("#main-input").addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        appendToLog(`${document.querySelector("#main-input").value}\n\n`);
        document.querySelector("#main-input").value = "";
    }
});
document.querySelector("#clear-button").addEventListener("click", (event) => {
    log.innerText = "";
    let stories = JSON.parse(window.localStorage.stories);
    stories[0].log = "";
    window.localStorage.stories = JSON.stringify(stories);
});