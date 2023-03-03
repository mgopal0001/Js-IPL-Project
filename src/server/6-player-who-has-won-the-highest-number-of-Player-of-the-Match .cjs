const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;
const data = fs.readFileSync('../data/matches.csv').toString();

const matchDescription = {
    id: { type: 'number', group: 1 },
    season: { type: 'number' },
    player_of_match: { type: 'string' }
};
const iplMatchData = csvToObj(data, ',', matchDescription);

function playerOfTheMatch() {

    const playersOfMatchOfEachSeason = {}

    for (let index = 0; index < iplMatchData.length; index++) {
        let iplYear = iplMatchData[index].season;

        if (!playersOfMatchOfEachSeason[iplYear]) {
            playersOfMatchOfEachSeason[iplYear] = [];
        }
        playersOfMatchOfEachSeason[iplYear].push(iplMatchData[index].player_of_match[0]);
    }

    const playersResult = {}

    for (let key in playersOfMatchOfEachSeason) {
        let playerMap = {}
        let playerArray = playersOfMatchOfEachSeason[key];

        for (let player in playerArray) {
            if (playerMap[playerArray[player]] == null) {
                playerMap[playerArray[player]] = 1;
            }
            else {
                playerMap[playerArray[player]]++;
            }
        }

        const playerOfMatchOfSeason = playerObject => {
            //returning highest number of player of match in season 

            return Object.keys(playerObject).filter(index => {
                return playerObject[index] == Math.max.apply(null,
                    Object.values(playerObject));
            });
        };
        let highestPlayer = playerOfMatchOfSeason(playerMap);
        playersResult[key] = highestPlayer[0];

    }

    const jsonObj = (JSON.stringify(playersResult));

    fs.writeFile("../public/output/6-player-who-has-won-the-highest-number-of-Player-of-the-Match.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

}

playerOfTheMatch();
module.exports = playerOfTheMatch;