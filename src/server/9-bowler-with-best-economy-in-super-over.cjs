const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;

const deliveryDescription = {
    bowler: { type: 'string', group: 1 },
    match_id: { type: 'number', group: 2 },
    over: { type: 'number', group: 3 },
    wide_runs: { type: 'number' },
    noball_runs: { type: 'number' },
    total_runs: { type: 'number' },
    bye_runs: { type: 'number' },
    legbye_runs: { type: 'number' },
    is_super_over: { type: 'number' }
};

const data = fs.readFileSync('../data/deliveries.csv').toString();
const iplMatchData = csvToObj(data, ',', deliveryDescription);
function bowlerWithBestEconomyInSuperOver() {

    const bowlerEconomy = {};

    for (let index = 0; index < iplMatchData.length; index++) {
        const bowler = iplMatchData[index].bowler;

        if (iplMatchData[index].is_super_over[0]) {

            if (!bowlerEconomy[bowler]) {
                bowlerEconomy[bowler] = {
                    runs: 0,
                    overs: 0
                };
            }

            bowlerEconomy[bowler].overs += 1

            for (let columnIndex = 0; columnIndex < iplMatchData[index].bye_runs.length; columnIndex++) {
                bowlerEconomy[bowler].runs +=
                    iplMatchData[index].total_runs[columnIndex] - iplMatchData[index].bye_runs[columnIndex]
                    - iplMatchData[index].legbye_runs[columnIndex] - iplMatchData[index].noball_runs[columnIndex]
                    - iplMatchData[index].wide_runs[columnIndex];
            }
        }
    }

    for (const key in bowlerEconomy) {

        let over = (bowlerEconomy[key].runs / 6);
        bowlerEconomy[key] = (bowlerEconomy[key].overs / over);
        let economy = bowlerEconomy[key];
        bowlerEconomy[key] = parseFloat(economy.toFixed(2));

    }

    const bowlerWithBestEconomy = {};

    for (let index = 0; index < 10; index++) {

        let smallestValue = Number.MAX_VALUE;
        let selectedKey = '';
        for (let key in bowlerEconomy) {
            if (bowlerEconomy[key] < smallestValue) {
                smallestValue = bowlerEconomy[key];
                selectedKey = key;
            }
        }
        bowlerWithBestEconomy[selectedKey] = smallestValue;
    }

    const jsonObj = (JSON.stringify(bowlerWithBestEconomy));

    fs.writeFile("../public/output/9-bowler-with-best-economy-in-super-over.json", jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}

bowlerWithBestEconomyInSuperOver();
module.exports = bowlerWithBestEconomyInSuperOver;