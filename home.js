let donutChart;
let barGraphChart;
let polarGraphChart;
let winsGlobal;
let notfoundFlag;

function getUserStats(response) {

    let fields = document.getElementById("required-fields")
    let userImg = document.getElementById("user-img-loc");
    let rankSection = document.getElementById("rank");

    if(response === "Empty Creds") {
        fields.style = "color: red";
    } else if(response === "Not Found") {
        alert("No User Found");
        fields.style = "color: lightgray";
        location.reload()
        notfoundFlag = 1;
    } else {
        fields.style = "color: lightgray";
        let foundData = JSON.parse(response);
        console.log(foundData)
        let foundUserImg = foundData.data.platformInfo.avatarUrl.toString()
        let stats = foundData.data.segments[0].stats;
        let wins = stats.wins.value;
        winsGlobal = wins;
        let gamesPlayed = stats.gamesPlayed.value;
        let top10 = stats.top10.value
        let top5 = stats.top5.value
        let top25 = stats.top25.value;
        let rank = stats.level.value;
        let kills = stats.kills.value;
        let deaths = stats.deaths.value;
        let downs = stats.downs.value
        let kd = stats.kdRatio.value;
        let winlossRatio = stats.wlRatio.value;

        let winLossPercentile = stats.wins.percentile;
        let kDPercentile = stats.kdRatio.percentile;
        let gamesPlayedPercentile = stats.gamesPlayed.percentile;
        let scorePerMinPercentile = stats.scorePerMinute.percentile;
        let contractsPercentile = stats.contracts.percentile;


        console.log(winLossPercentile)
        console.log(kDPercentile)
        console.log(gamesPlayedPercentile)
        console.log(scorePerMinPercentile)
        console.log(contractsPercentile)
        console.log(top25)

        rankSection.innerText = "Rank: " + rank.toString();

        makeBarGraph(wins, top5, top10, top25, gamesPlayed);
        makeDonutChart(kills, deaths, downs);
        makePolarChart(winLossPercentile, kDPercentile, gamesPlayedPercentile, scorePerMinPercentile, contractsPercentile);

        document.getElementById("banner").innerText = " KD: " + kd.toString() + " ----- Kills: " + kills.toString()
            + " ----- Deaths: " + deaths.toString() + " ----- Win/Loss: " +
            winlossRatio.toString() + " ----- Wins: " + wins.toString() + " ----- Games Played: " + gamesPlayed.toString();
        document.getElementById("banner").className = "banner-background"

        userImg.style = "background-image: url(" + foundUserImg + ")";
    }
    return false;
}

function getData() {
    let cors = "https://cors-anywhere.herokuapp.com/"
    let url;
    let gamerTag = document.getElementById("gamer-tag").value;
    let system = document.getElementById("console").value;


    let leaderboardsURL = "https://api.tracker.gg/api/v1/warzone/standard/leaderboards"

    if(system === "Console..." || gamerTag === "") {
        return getUserStats("Empty Creds")
    }

    if(system === "1") {
        url = 'https://api.tracker.gg/api/v2/warzone/standard/profile/'
            + "psn" + '/' + gamerTag.toString();
    } else if(system === "2") {
        url = 'https://api.tracker.gg/api/v2/warzone/standard/profile/'
            + "xbl" + '/' + gamerTag.toString();
    } else if(system === "3") {
        url = 'https://api.tracker.gg/api/v2/warzone/standard/profile/'
            + "atvi" + '/' + gamerTag.toString();
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            getUserStats(httpRequest.responseText)

        } else if(httpRequest.readyState === 4 && httpRequest.status !== 200) {
            getUserStats("Not Found");

        }
    };

    httpRequest.open("GET", cors + url, false);
    httpRequest.send();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            getLeaderboards(httpRequest.responseText)

        } else if(httpRequest.readyState === 4 && httpRequest.status !== 200) {
            getLeaderboards("Not Found");

        }
    };
    httpRequest.open("GET", cors + leaderboardsURL, false);
    httpRequest.send();
    return false;
}


function getLeaderboards(response) {
    let foundData = JSON.parse(response);
    console.log(foundData)
    let wins = foundData.data.items[0].value;

    if(notfoundFlag === 1) {
        return false;
    }
    makeWinnerGraph(wins)
    return false;
}

function makeWinnerGraph(wins) {
    document.getElementById("last-chart").innerHTML = "<canvas id='stats'> </canvas>" ;
    let chart = document.getElementById("stats");

    barGraphChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['Your wins', 'Top Wins'],
            datasets: [
                {
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)'
                    ],
                    data: [winsGlobal, wins],
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                fontColor: 'white',
                display: true,
                text: 'Your wins vs Number 1 Wins in The World'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'white'
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white'
                    },
                }]
            }
        }
    });
}

function makeDonutChart(kills, deaths, downs) {
    document.getElementById("donut-chart").innerHTML ="<canvas id='k-d'> </canvas>" ;
    let chart = document.getElementById("k-d");
    donutChart = new Chart(chart, {
        type: 'doughnut',
        data: {
            labels: ['Kills', 'Deaths', 'Downs'],
            datasets: [{
                labels: ['Kills', 'Deaths', 'Downs'],
                data: [kills, deaths, downs],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(255, 99, 132, 0.8)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'white'
                }
            },
            title: {
                fontColor: 'white',
                display: true,
                text: 'Kills vs Deaths vs Downs '
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function makeBarGraph(wins, top5, top10, top25, gamesplayed) {
    document.getElementById("bar-graph").innerHTML = "<canvas id='win-loss'> </canvas>" ;
    let chart = document.getElementById("win-loss");

    barGraphChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['Wins', 'Top 5', 'Top 10', 'Top 25', 'Games Played'],
            datasets: [
                {
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        "#8e5ea2"
                    ],
                    data: [wins, top5, top10, top25, gamesplayed],
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                fontColor: 'white',
                display: true,
                text: 'Wins vs Top 5 vs Top 10 vs Top 25 vs Games Played'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'white'
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white'
                    },
                }]
            }
        }
    });
}

function makePolarChart(winLossPercentile, kDPercentile, gamesPlayedPercentile, scorePerMinPercentile, contractsPercentile) {
   document.getElementById("polar-chart").innerHTML = "<canvas id='over-all'> </canvas>";
    let chart = document.getElementById("over-all");

    polarGraphChart = new Chart(chart, {
        type: 'polarArea',
        data: {
            labels: ['Win Loss', 'KD', 'Games Played', 'Score Per Min', 'Contracts'],
            datasets: [
                {
                    labels: ['Win Loss', 'KD', 'Games Played', 'Score Per Min', 'Contracts'],
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: [winLossPercentile, kDPercentile, gamesPlayedPercentile, scorePerMinPercentile, contractsPercentile]
                }
            ]
        },
        options: {
            title: {
                fontColor: 'white',
                display: true,
                text: 'In Percentile'
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'white'
                }
            }
        }
    });
}

function helpHome() {
    alert("Enter in a gamer tag and console type to view all the stats for a given user" +
        " An Example GamerTag: CommanderDana and console = Xbox")
    return false;
}
