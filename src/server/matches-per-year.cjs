const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;

const data = fs.readFileSync('../data/matches.csv').toString();
const matchDescription = {
    id: { type: 'number', group: 1 },
    season: { type: 'number' }
};
const iplMatchData = csvToObj(data, ',', matchDescription);

function matchesPerYear() {
    const matchesPerYearData = {};
    for (let index = 0; index < iplMatchData.length; index++) {

        let iplSeason = iplMatchData[i].season;

        if (matchesPerYearData[iplSeason] = matchesPerYearData[iplSeason]) {
            matchesPerYearData[iplSeason] = matchesPerYearData[iplSeason] + 1;

        } else {
            matchesPerYearData[iplSeason] = 1;
        }
    }

    const jsonObj = (JSON.stringify(matchesPerYearData));

    fs.writeFile("../public/output/matches-per-year.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}
matchesPerYear();

module.exports = matchesPerYear;




