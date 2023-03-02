const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;

const matchDescription = {
    player_dismissed: { type: 'string', group: 1 },
    dismissal_kind: { type: 'string' },
    bowler: { type: 'string' },
    fielder: { type: 'string' }
};

const data = fs.readFileSync('../data/deliveries.csv').toString();
const iplMatchData = csvToObj(data, ',', matchDescription);

function highestNumberOfPlayerDismissed() {

    const playersDismissed = {};
    let maximum = -1;
    let whichPlayerPlaying = "";
    let dismissedByWhichPlayer = "";

    for (let index = 0; index < iplMatchData.length; index++) {
        const player_dismissed = iplMatchData[index].player_dismissed;

        for (let columnIndex = 0; columnIndex < iplMatchData[index].dismissal_kind.length; columnIndex++) {
            if (!iplMatchData[index].dismissal_kind[columnIndex]) {
                continue;
            }

            const dismissed_by = iplMatchData[index].dismissal_kind[columnIndex] === 'run out'
                ? iplMatchData[index].fielder[columnIndex] : iplMatchData[index].bowler[columnIndex];

            if (!playersDismissed[player_dismissed]) {
                playersDismissed[player_dismissed] = {};
            }

            if (playersDismissed[player_dismissed][dismissed_by]) {
                playersDismissed[player_dismissed][dismissed_by]++;
            } else {
                playersDismissed[player_dismissed][dismissed_by] = 1;
            }

        }
    }

    for (const playerNamePlaying in playersDismissed) {
        for (const playerNameNotPlaying in playersDismissed[playerNamePlaying]) {

            if (playersDismissed[playerNamePlaying][playerNameNotPlaying] > maximum) {

                maximum = playersDismissed[playerNamePlaying][playerNameNotPlaying];
                whichPlayerPlaying = playerNamePlaying;
                dismissedByWhichPlayer = playerNameNotPlaying;
            }
        }
    }
    const finalResultObj = { whichPlayerPlaying, dismissedByWhichPlayer };

    const jsonObj = (JSON.stringify(finalResultObj));

    fs.writeFile("../public/output/8-highest-number-of-player-dissmissed-by-another-player.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}
highestNumberOfPlayerDismissed();
module.exports = highestNumberOfPlayerDismissed;