const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;
const data = fs.readFileSync('../data/matches.csv').toString();

const matchDescription = {
    season: { type: 'number', group: 1 },
    winner: { type: 'string', group: 2 }
};
const iplMatchData = csvToObj(data, ',', matchDescription);

function matchesWonPerTeamPerYear() {
    const matchesWonPerTeamPerYear = {};

    for (let index = 0; index < iplMatchData.length; index++) {

        let iplYear = iplMatchData[index].season;
        let matchWinner = iplMatchData[index].winner;

        if (!matchesWonPerTeamPerYear[iplYear]) {
            matchesWonPerTeamPerYear[iplYear] = {};
        }
        if (!matchesWonPerTeamPerYear[iplYear][matchWinner]) {
            matchesWonPerTeamPerYear[iplYear][matchWinner] = 0;
        }
        matchesWonPerTeamPerYear[iplYear][matchWinner] += 1;
    }

    const jsonObj = (JSON.stringify(matchesWonPerTeamPerYear));

    fs.writeFile("../public/output/matches-won-per-team-per-year.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}
matchesWonPerTeamPerYear();
module.exports = matchesWonPerTeamPerYear;
