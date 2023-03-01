const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;

const data = fs.readFileSync('../data/matches.csv').toString();

const matchDescription = {
    id: { type: 'number', group: 1 },
    season: { type: 'number' }
};
const iplMatchData = csvToObj(data, ',', matchDescription);

const deliveriesData = fs.readFileSync('../data/deliveries.csv').toString();

const deliveryDescription = {
    match_id: { type: 'number', group: 1 },
    extra_runs: { type: 'number' },
    bowling_team: { type: 'string', group: 2 }

}
const deliveryData = csvToObj(deliveriesData, ',', deliveryDescription);



function extraRunsInConcededByTeam() {

    const matchId = {};

    for (const key in iplMatchData) {
        if (iplMatchData[key].season.includes(2016)) {
            matchId[iplMatchData[key].id] = 2016;
        }
    }

    const extraRunPerTeam = {};

    for (const key in deliveryData) {

        if (matchId[deliveryData[key].match_id]) {

            let currentRun = 0;

            for (let index = 0; index < deliveryData[key].extra_runs.length; index++) {
                currentRun += deliveryData[key].extra_runs[index];
            }

            if (extraRunPerTeam[deliveryData[key].bowling_team]) {
                extraRunPerTeam[deliveryData[key].bowling_team] += currentRun;
            } else {
                extraRunPerTeam[deliveryData[key].bowling_team] = currentRun;
            }
        }
    }

    const jsonObj = (JSON.stringify(extraRunPerTeam));
    
    fs.writeFile("../public/output/3-extra-runs-conceded-by-team-in-2016.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}
extraRunsInConcededByTeam();
module.exports = extraRunsInConcededByTeam;