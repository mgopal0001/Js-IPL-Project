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