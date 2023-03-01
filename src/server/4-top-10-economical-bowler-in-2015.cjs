const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;

const data = fs.readFileSync('../data/matches.csv').toString();

const matchDescription = {
    id: { type: 'number', group: 1 },
    season: { type: 'number' }
};

const deliveriesData = fs.readFileSync('../data/deliveries.csv').toString();

const deliveryDescription = {
    match_id: { type: 'number', group: 1 },
    extra_runs: { type: 'number' },
    bowling_team: { type: 'string' },
    wide_runs: { type: 'number' },
    noball_runs: { type: 'number' },
    extra_runs: { type: 'number' },
    batsman_runs: { type: 'number' },
    bowler: { type: 'string' },
    total_runs: { type: 'number' },
    bye_runs: { type: 'number' },
    legbye_runs: { type: 'number' }
    
};
const deliveryData = csvToObj(deliveriesData, ',', deliveryDescription);
const iplMatchData = csvToObj(data, ',', matchDescription);
// console.table(deliveryData);


const matchId = {};
for (const key in iplMatchData) {
    if (iplMatchData[key].season.includes(2015)) {
        matchId[iplMatchData[key].id] = 2015;
    }
}
// console.log(matchId);

const bowlerEconomy = {};
for (const key in deliveryData) {
    if (matchId[deliveryData[key].match_id]) {

        for (let index = 0; index < deliveryData[key].bowler.length; index++) {

            let run = 0;
            if (deliveryData[key].total_runs[index]) {
                run = deliveryData[key].total_runs[index];
            }
            if (deliveryData[key].wide_runs[index]) {
                run = run - deliveryData[key].total_runs[index];
            }
            if (deliveryData[key].noball_runs[index]) {
                run = run - deliveryData[key].noball_runs[index];
            }
            if (deliveryData[key].bye_runs[index]) {
                run = run - deliveryData[key].bye_runs[index];
            }
            if (deliveryData[key].legbye_runs[index]) {
                run = run - deliveryData[key].legbye_runs[index];
            }

            if (!bowlerEconomy[deliveryData[key].bowler[index]]) {
                bowlerEconomy[deliveryData[key].bowler[index]] = [run, 1];
            } else {
                bowlerEconomy[deliveryData[key].bowler[index]] = [bowlerEconomy[deliveryData[key].bowler[index]][0] + run, bowlerEconomy[deliveryData[key].bowler[index]][1] + 1]
            }

        }

    }
}
for (const key in bowlerEconomy) {
    let overs = (bowlerEconomy[key][1] / 6);
    bowlerEconomy[key] = (bowlerEconomy[key][0] / overs);

}

console.log(bowlerEconomy);