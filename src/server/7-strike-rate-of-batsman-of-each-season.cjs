const fs = require('fs');
const { getgroups } = require('process');
const csvToObj = require('csv-to-js-parser').csvToObj;

const data = fs.readFileSync('../data/matches.csv').toString();
const deliveriesData = fs.readFileSync('../data/deliveries.csv').toString();

const matchDescription = {
    id: { type: 'number', group: 1 },
    season: { type: 'number' }
};

const deliveryDescription = {
    match_id: { type: 'number', group: 1 },
    batsman: { type: 'string' },
    batsman_runs: { type: 'number' }
};

const iplMatchData = csvToObj(data, ',', matchDescription);
const deliveryData = csvToObj(deliveriesData, ',', deliveryDescription);


const seasonMatchIdMap = {};

for (let index = 0; index < iplMatchData.length; index++) {
    let iplSeason = iplMatchData[index].season;

    if (!seasonMatchIdMap[iplSeason]) {
        seasonMatchIdMap[iplSeason] = {};
    } else {
        seasonMatchIdMap[iplSeason][iplMatchData[index].id] = 1;
    }
}

const batsmanMap = {};

for (let index = 0; index < deliveryData.length; index++) {
    for (const season in seasonMatchIdMap) {
        if (seasonMatchIdMap[season][deliveryData[index].match_id]) {
            for (let columnIndex = 0; columnIndex < deliveryData[index].batsman.length; columnIndex++) {
                const key = deliveryData[index].batsman[columnIndex];

                if (!batsmanMap[key]) {
                    batsmanMap[key] = {};
                }

                if (batsmanMap[key][season]) {
                    batsmanMap[key][season] = {
                        runs: batsmanMap[key][season].runs + deliveryData[index].batsman_runs[columnIndex],
                        balls: batsmanMap[key][season].balls + 1
                    };
                } else {
                    batsmanMap[key][season] = {
                        runs: deliveryData[index].batsman_runs[columnIndex],
                        balls: 1
                    };
                }
            }

        }
    }
}

for (const key in batsmanMap) {
    for (const index in batsmanMap[key]) {
        let strikeRate = batsmanMap[key][index].runs / batsmanMap[key][index].balls * 100;
        batsmanMap[key][index] = parseFloat(strikeRate.toFixed(2));
    }
}
console.log(batsmanMap);