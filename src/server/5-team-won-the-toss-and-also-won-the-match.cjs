const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;
const data = fs.readFileSync('../data/matches.csv').toString();

const matchDescription = {
    id: { type: 'number', group: 1 },
    toss_winner: { type: 'string' },
    winner: { type: 'string' }
};

const iplMatchData = csvToObj(data, ',', matchDescription);

function teamWonTheTossAndTheMatch() {
    const tossAndMatchWinner = {};

    for (let index = 0; index < iplMatchData.length; index++) {
        let matchWinner = iplMatchData[index].winner[0];
        let tossWinner = iplMatchData[index].toss_winner[0];

        if (matchWinner === tossWinner) {
            if (tossAndMatchWinner[matchWinner] = tossAndMatchWinner[matchWinner]) {
                tossAndMatchWinner[matchWinner] += 1;
            } else {
                tossAndMatchWinner[matchWinner] = 1;
            }
        }
    }
    const jsonObj = (JSON.stringify(tossAndMatchWinner));

    fs.writeFile("../public/output/5-team-won-the-toss-and-also-won-the-match.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

}
teamWonTheTossAndTheMatch();
module.exports = teamWonTheTossAndTheMatch;
