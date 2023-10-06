export const oracle = ["No, and", "No", "No, but", "Yes, but", "Yes", "Yes, and",];
export const interventions = ["New entity", "Entity positive", "Entity negative", "Advance plot", "Regress plot/Hinder", "Wild"];
export const twane = ["Increase simple element", "Decrease simple element", "Add simple element", "Remove simple element", "Increase major element", "Decrease major element", "Add major element", "Remove major element", "Wild positive", "Wild negative."]

const generateIntervention = () => interventions[Math.floor(Math.random() * 6)];

export function addInterventionPoint(oracleResult, ip) {
    if (oracleResult == 5) {
        let interventionPoints = ip + 1;
        let stories = JSON.parse(window.localStorage.stories)
        stories[0]["IN"] = interventionPoints
        window.localStorage.stories = stories
        return interventionPoints;
    }
    return ip;
}

export function changeInterventionIfNeccesary(interventionPoints) {
    if (interventionPoints >= 3) { return ` +Intervention: ${generateIntervention()}`; }
    return "";
}

