fetch("/output/1-matches-per-year.json")
    .then((data) => data.json())
    .then((data) => {
        const dataToPlot = Object.values(data);
        console.log("Data Loaded", dataToPlot);

        Highcharts.chart('container', {

            title: {
                text: 'IPL Matches Per Year',
                align: 'left'
            },

            yAxis: {
                title: {
                    text: 'Matches won'
                }
            },

            xAxis: {
                title: {
                    text: 'IPL Seasons'
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2008
                }
            },

            series: [{
                name: 'Matches per year',
                data: dataToPlot
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    })


fetch("/output/3-extra-runs-conceded-by-team-in-2016.json")
    .then((data) => data.json())
    .then((data) => {
        const team = Object.keys(data);
        const teamRun = Object.values(data);
        const chart = Highcharts.chart('container3', {
            title: {
                text: 'Extra Runs Conceded By Team in 2016',
                align: 'left'
            },

            xAxis: {
                categories: team
            },
            series: [{
                type: 'column',
                name: 'Extra Runs',
                colorByPoint: true,
                data: teamRun,
                showInLegend: false
            }]
        });
    })

fetch("/output/4-top-10-economical-bowler-in-2015.json")
    .then((data) => data.json())
    .then((data) => {
        const bowler = Object.keys(data);
        const Economy = Object.values(data);
        const chart = Highcharts.chart('container4', {
            title: {
                text: 'Top 10 Economical Bowler in 2015',
                align: 'left'
            },

            xAxis: {
                categories: bowler
            },
            series: [{
                type: 'column',
                name: 'Economy Rate',
                colorByPoint: true,
                data: Economy,
                showInLegend: false
            }]
        });
    })

fetch("/output/5-team-won-the-toss-and-also-won-the-match.json")
    .then((data) => data.json())
    .then((data) => {
        const iplTeam = Object.keys(data);
        const numberOfTimes = Object.values(data);
        console.log(iplTeam);
        const chart = Highcharts.chart('container5', {
            title: {
                text: 'Teams won the toss and also won the match',
                align: 'left'
            },

            xAxis: {
                categories: iplTeam
            },
            series: [{
                type: 'column',
                name: 'Number of times won the toss and match',
                colorByPoint: true,
                data: numberOfTimes,
                showInLegend: false
            }]
        });
    })

fetch("/output/6-player-who-has-won-the-highest-number-of-Player-of-the-Match.json")
    .then((data) => data.json())
    .then((data) => {
        const iplSeason = (Object.keys(data));
        const iplArray = iplSeason.map(Number);
        const playerName = Object.values(data);
        const chart = Highcharts.chart('container6', {
            title: {
                text: 'Players Won the highest number of Player of the Match',
                align: 'left'
            },

            xAxis: {
                categories: playerName
            },
            series: [{
                type: 'column',
                name: 'Number of times won the toss and match',
                colorByPoint: true,
                data: iplArray,
                showInLegend: false
            }]
        });
    })


fetch("/output/9-bowler-with-best-economy-in-super-over.json")
    .then((data) => data.json())
    .then((data) => {
        const bowlerName = Object.keys(data);
        const economy = Object.values(data)
        const chart = Highcharts.chart('container9', {
            title: {
                text: 'Bowler with best economy rate in super over',
                align: 'left'
            },

            xAxis: {
                categories: bowlerName
            },
            series: [{
                type: 'column',
                name: 'Economy rate',
                colorByPoint: true,
                data: economy,
                showInLegend: false
            }]
        });
    })