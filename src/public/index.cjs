fetch("/output/1-matches-per-year.json")
    .then((data) => data.json())
    .then((data) => {
        const dataToPlot = Object.values(data);
        console.log("Data Loaded", dataToPlot);

        Highcharts.chart('container1', {

            title: {
                text: 'IPL Matches Per Year',
                align: 'left'
            },

            yAxis: {
                title: {
                    text: 'MATCHES WON'
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
            yAxis: {
                title: {
                    text: 'EXTRA RUNS'
                }
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
            yAxis: {
                title: {
                    text: 'ECONOMY'
                }
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
            yAxis: {
                title: {
                    text: 'MATCHES WON'
                }
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
        console.log("iplArray", iplArray);
        const playerName = Object.values(data);
        const chart = Highcharts.chart('container6', {
            title: {
                text: 'Players Won the highest number of Player of the Match',
                align: 'left'
            },

            xAxis: {
                categories: playerName
            },
            yAxis: {
                title: {
                    text: 'MATCHES WON'
                }
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
            yAxis: {
                title: {
                    text: 'Economy Rate'
                }
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

fetch("/output/8-highest-number-of-player-dissmissed-by-another-player.json")
    .then((data) => data.json())
    .then((data) => {
        const batsman = (data.Player);
        const bowler = (data.Bowler);
        const times = (data.times);
        const chart = Highcharts.chart('container8', {
            title: {
                text: 'Highest number of player dismissed',
                align: 'left'
            },

            xAxis: {
                
                categories: [bowler]
            },
            yAxis: {
                title: {
                    text: 'Number of times Dismissed'
                }
            },
            series: [{
                type: 'column',
                name: batsman,
                colorByPoint: true,
                data: [times],
                showInLegend: false
            }]
        });
    })



fetch("/output/2-matches-won-per-team-per-year.json")
    .then((data) => data.json())
    .then((data) => {
        const matchArray = [];
        for (const key in data) {
            const newTeam = {}
            let teamData = Object.values(data[key]);
            newTeam.name = key;
            newTeam.data = teamData;
            matchArray.push(newTeam);
        }

        console.log(matchArray[0].data);
        console.log(matchArray);
        Highcharts.chart('container2', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Matches Won Per Team Per Year',
                align: 'left'
            },
            subtitle: {
                text: 'Source: <a ' +
                    'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
                    'target="_blank">Wikipedia.org</a>',
                align: 'left'
            },
            xAxis: {
                categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'IPL SEASON',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' Matches'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: matchArray
        });

    })


fetch("/output/7-strike-rate-of-batsman-of-each-season.json")
    .then((data) => data.json())
    .then((data) => {
        const playerArray = [];
        for (const key in data) {
            const newTeam = {}
            let teamData = Object.values(data[key]);
            newTeam.name = key;
            newTeam.data = teamData;
            playerArray.push(newTeam);
        }
        Highcharts.chart('container7', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Strike Rate of Batsman of Each Season',
                align: 'left'
            },
            subtitle: {
                text: 'Source: <a ' +
                    'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
                    'target="_blank">Wikipedia.org</a>',
                align: 'left'
            },
            xAxis: {
                categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' Matches'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: playerArray
        });

    })