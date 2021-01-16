import teams from '../Models/TEAMS.json';

function playMatch(home, away) {
    var homeChance = 0;
    var homeSurpriseChance = 0;
    var awayChance = 0;
    var awaySurpriseChance = 0;

    //TAKTİKSEL AĞIRLIK
    if (home.tactics === 'def' && away.tactics === 'def') {
        if (home.defence > away.defence) {
            homeChance++;
            if (away.attack > home.attack) {
                awaySurpriseChance++;
            } else {
                homeChance++;
            }
        } else {
            awayChance++

            if (home.attack > away.attack) {
                homeSurpriseChance++;
            } else {
                awayChance++;
            }
        }
    };
    if (home.tactics === 'off' && away.tactics === 'off') {
        if (home.attack > away.attack) {
            homeChance++;
            if (away.defence > home.defence) {
                awaySurpriseChance++;
            } else {
                homeChance++;
            }
        } else {
            awayChance++;

            if (away.defence < home.defence) {
                homeSurpriseChance++;
            } else {
                awayChance++;
            }
        }
    };
    if (home.tactics === 'def' && away.tactics === 'off') {
        if (home.defence > away.attack) {
            homeChance++;
            if (away.defence > home.defence) {
                awaySurpriseChance++;
            } else {
                homeChance++;
            }
        } else {
            awayChance++;

            if (away.attack < home.attack) {
                homeSurpriseChance++;
            } else {
                awayChance++;
            }
        }
    };
    if (home.tactics === 'off' && away.tactics === 'def') {
        if (home.attack > away.defence) {
            homeChance++;
            if (away.defence > home.defence) {
                awaySurpriseChance++;
            } else {
                homeChance++;
            }
        } else {
            awayChance++;

            if (away.defence < home.defence) {
                homeSurpriseChance++;
            } else {
                awayChance++;
            }
        }
    };
    //EV SAHİBİ AVANTAJI
    homeChance += home.fanSupport / 2;
    home.morale += 2;
    away.morale -= 2;

    //MORAL
    if (home.morale > away.morale) {
        homeChance += 2;
    } else {
        awayChance += 2;
    }

    //KADRO KALİTESİ
    var qualityDifference = home.playerQuality - away.playerQuality;

    if (home.playerQuality > away.playerQuality) {
        homeChance += 2;

        if (qualityDifference < 4) {
            awaySurpriseChance++;
        } else {
            awaySurpriseChance--;
        }
    } else {
        awayChance += 2;

        if (qualityDifference < 4) {
            homeSurpriseChance++;
        } else {
            homeSurpriseChance--;
        }
    }

    //HÜCUM SAVUNMA ETKİSİ
    if (home.attack > away.attack && away.defence < home.defence) {
        homeChance += 2;
    }
    if (home.attack < away.attack && away.defence > home.defence) {
        awayChance += 2;
    }
    if (home.attack > away.attack && away.defence > home.defence) {
        awayChance += 2;
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    //GOL HESAPLA
    var homeGoal;
    var awayGoal;
    if (homeChance > awayChance) {
        if (homeSurpriseChance > awaySurpriseChance) {
            homeGoal = randomIntFromInterval(1, 5);
            awayGoal = randomIntFromInterval(0, 4);
        } else if (homeSurpriseChance < awaySurpriseChance) {
            homeGoal = randomIntFromInterval(1, 5)
            awayGoal = randomIntFromInterval(1, 4);
        } else {
            homeGoal = randomIntFromInterval(1, 5)
            awayGoal = randomIntFromInterval(0, 4);
        }
    } else if (homeChance < awayChance) {
        if (homeSurpriseChance < awaySurpriseChance) {
            awayGoal = randomIntFromInterval(1, 5)
            homeGoal = randomIntFromInterval(0, 4)
        } else if (homeSurpriseChance > awaySurpriseChance) {
            awayGoal = randomIntFromInterval(1, 5)
            homeGoal = randomIntFromInterval(1, 4)
        } else {
            awayGoal = randomIntFromInterval(1, 5)
            homeGoal = randomIntFromInterval(0, 4)
        }
    } else {
        homeGoal = randomIntFromInterval(0, 4)
        awayGoal = randomIntFromInterval(0, 4)
    }

    return {
        homeGoal: homeGoal,
        awayGoal: awayGoal,
    };
}

function createAndSetFixture(roundsCountPerTeam) {
    var fixture = [];

    // Liste karıştırma
    for (let i = teams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teams[i], teams[j]] = [teams[j], teams[i]];
    }

    var count = 0;

    for (var round = 0; round < roundsCountPerTeam; round++) {
        for (var match = 0; match < 2; match++) {
            var _home = (round + match) % (teams.length - 1);
            var _away = (teams.length - 1 - match + round) % (teams.length - 1);
            var _awayTeam = '';
            var _homeTeam = '';

            if (match === 0) {
                _away = teams.length - 1;
            }

            if (round > 2) {
                _homeTeam = teams[_home].name;
                _awayTeam = teams[_away].name;
            } else {
                _homeTeam = teams[_away].name;
                _awayTeam = teams[_home].name;
            }

            count++
            fixture.push({
                id: count.toString(),
                home: _homeTeam,
                away: _awayTeam,
                week: round + 1,
                homeGoal: 0,
                awayGoal: 0,
                isPlayed: false
            });
        };
    }

    localStorage.setItem('fixture', JSON.stringify(fixture));

    return fixture;
}

function sortTeams(teams) {
    return teams.sort(function (a, b) {
        return b.points - a.points || b.goalDifference - a.goalDifference ||
            b.goalsAgainst - a.goalsAgainst;
    });
}

function calculateDoubleAverage(team1, team2, fixture) {
    var Team1HomeMatch = fixture.filter((match) => match.home === team1.name && match.away === team2.name)[0];
    var Team2HomeMatch = fixture.filter((match) => match.home === team2.name && match.away === team1.name)[0];
    var team1Points = 0;
    var team2Points = 0;
    var team1Goals = Team1HomeMatch.homeGoal + Team2HomeMatch.awayGoal;
    var team2Goals = Team2HomeMatch.homeGoal + Team1HomeMatch.awayGoal;

    if (Team1HomeMatch.homeGoal > Team1HomeMatch.awayGoal) {
        team1Points += 3;
    } else if (Team1HomeMatch.homeGoal < Team1HomeMatch.awayGoal) {
        team2Points += 3;
    } else {
        team1Points += 1;
        team2Points += 1;
    }

    if (Team2HomeMatch.homeGoal > Team2HomeMatch.awayGoal) {
        team2Points += 3;
    } else if (Team2HomeMatch.homeGoal < Team2HomeMatch.awayGoal) {
        team1Points += 3;
    } else {
        team1Points += 1;
        team2Points += 1;
    }

    if (team1Points > team2Points) {
        return team1.name;
    } else if (team1Points < team2Points) {
        return team2.name;
    } else {
        if (team1Goals !== team2Goals) {
            var team1GoalsAwayGoalsRule = Team1HomeMatch.homeGoal + (Team2HomeMatch.awayGoal * 2);
            var team2GoalsAwayGoalsRule = Team2HomeMatch.homeGoal + (Team1HomeMatch.awayGoal * 2);

            if (team1GoalsAwayGoalsRule > team2GoalsAwayGoalsRule) {
                return team1.name;
            } else if (team1GoalsAwayGoalsRule < team2GoalsAwayGoalsRule) {
                return team2.name;
            } else {
                if (team1.goalsFor > team2.goalsFor) {
                    return team1.name;
                } else if (team1.goalsFor < team2.goalsFor) {
                    return team2.name;
                } else {
                    return 'equal';
                }
            }
        } else {
            if (team1.goalDifference > team2.goalDifference) {
                return team1.name;
            } else if (team1.goalDifference < team2.goalDifference) {
                return team2.name;
            } else {
                if (team1.goalsFor > team2.goalsFor) {
                    return team1.name;
                } else if (team1.goalsFor > team2.goalsFor) {
                    return team2.name;
                } else {
                    return 'equal';
                }
            }
        }
    }
}

function undoMatchStatistics(homeTeam, awayTeam, oldMatch) {
    var oldWinner = oldMatch.homeGoal > oldMatch.awayGoal ?
        'home' : (oldMatch.homeGoal === oldMatch.awayGoal ? 'drawn' : 'away');

    homeTeam.played--;
    awayTeam.played--;

    homeTeam.goalDifference -= (oldMatch.homeGoal - oldMatch.awayGoal);
    awayTeam.goalDifference -= (oldMatch.awayGoal - oldMatch.homeGoal);

    homeTeam.goalsFor -= oldMatch.homeGoal;
    awayTeam.goalsFor -= oldMatch.awayGoal;

    homeTeam.goalsAgainst -= oldMatch.awayGoal;
    awayTeam.goalsAgainst -= oldMatch.homeGoal;

    switch (oldWinner) {
        case 'home':
            homeTeam.points -= 3;

            homeTeam.won--;
            awayTeam.lost--;

            homeTeam.morale -= 2;
            awayTeam.morale += 2;

            // homeTeam.form += 'W'; string metodu ile harf yerini değiştir
            break;
        case 'away':
            awayTeam.points -= 3;

            homeTeam.lost--;
            awayTeam.won--;

            homeTeam.morale += 2;
            awayTeam.morale -= 2;

            break;
        case 'drawn':
            homeTeam.drawn--;
            awayTeam.drawn--;

            homeTeam.points--;
            awayTeam.points--;

            homeTeam.morale -= 1;
            awayTeam.morale -= 1;
            break;
        default:
            break;
    }

    return {
        homeTeam,
        awayTeam
    };
}

function calculateChampionshipChanceAndSet(weekRemaining, teams) {
    var requiredPts = weekRemaining * 3;

    teams = sortTeams(teams);
    var firstTeam = teams[0];
    var secondTeam = teams[1];

    if (!requiredPts) {
        firstTeam.championshipChance = 'champion'
    } else {
        firstTeam = compareTeamsChance(secondTeam, firstTeam, requiredPts, true);
    }

    var newTeams = [firstTeam];

    teams.forEach(function (team) {
        if (team.name !== firstTeam.name) {
            newTeams.push(compareTeamsChance(firstTeam, team, requiredPts));
        }
    });

    return teams;
}

function compareTeamsChance(firstTeam, otherTeam, requiredPts, isFirst) {
    if (isFirst) {
        var ptsDifference = otherTeam.points - firstTeam.points;

        if (ptsDifference == 0) {
            otherTeam.championshipChance = "high chance";
        } else if (ptsDifference > requiredPts) {
            otherTeam.championshipChance = "champion";
        } else if (ptsDifference < requiredPts) {
            otherTeam.championshipChance = "problably";
        } else if (ptsDifference == requiredPts) {
            otherTeam.championshipChance = "high chance";
        }
    } else {
        var ptsDifference = Math.abs(firstTeam.points - otherTeam.points);

        if (!requiredPts) {
            otherTeam.championshipChance = 'no chance';
        } else {
            if (ptsDifference === 0) {
                otherTeam.championshipChance = "high chance";
            } else if (ptsDifference > requiredPts) {
                otherTeam.championshipChance = "impossible";
            } else if (ptsDifference < requiredPts) {
                if (firstTeam.points > otherTeam.points) {
                    otherTeam.championshipChance = "problably";
                } else {
                    otherTeam.championshipChance = "high chance";
                }
            } else if (ptsDifference === requiredPts) {
                if (firstTeam.points > otherTeam.points) {
                    otherTeam.championshipChance = "low chance";
                } else {
                    otherTeam.championshipChance = "problably";
                }
            }
        }
    }

    return otherTeam;
}

function simulateAllMatches(fixture, teams, playMatchFunc, setMatchStatisticsFunc) {
    var home, away, scores, newTeams;
    var fixtureWithoutPlayedMatches = fixture;
    var teamsWithoutPlayedMatches = teams;

    fixture.filter((match) => !match.isPlayed).forEach((match) => {
        teamsWithoutPlayedMatches = teamsWithoutPlayedMatches.filter((team) => team.name !== match.home && team.name !== match.away);
        fixtureWithoutPlayedMatches = fixtureWithoutPlayedMatches.filter((tempMatch) => tempMatch.id !== match.id);
        home = teams.filter((team) => team.name === match.home)[0];
        away = teams.filter((team) => team.name === match.away)[0];
        scores = playMatchFunc(home, away)

        match.homeGoal = scores.homeGoal;
        match.awayGoal = scores.awayGoal;
        match.isPlayed = true;

        fixtureWithoutPlayedMatches.push(match);

        newTeams = setMatchStatisticsFunc(home, away, match);

        teamsWithoutPlayedMatches.push(newTeams.homeTeam);
        teamsWithoutPlayedMatches.push(newTeams.awayTeam);
    });

    return {
        newFixture: fixtureWithoutPlayedMatches,
        newTeams: teamsWithoutPlayedMatches
    };
}

function setMatchStatistics(homeTeam, awayTeam, newMatch) {
    var winner = newMatch.homeGoal > newMatch.awayGoal ? 'home' :
        (newMatch.homeGoal === newMatch.awayGoal ? 'drawn' : 'away');

    homeTeam.played++;
    awayTeam.played++;

    homeTeam.goalDifference += (newMatch.homeGoal - newMatch.awayGoal);
    awayTeam.goalDifference += (newMatch.awayGoal - newMatch.homeGoal);

    homeTeam.goalsAgainst += newMatch.awayGoal;
    awayTeam.goalsAgainst += newMatch.homeGoal;

    homeTeam.goalsFor += newMatch.homeGoal;
    awayTeam.goalsFor += newMatch.awayGoal;

    switch (winner) {
        case 'home':
            homeTeam.points += 3;

            homeTeam.won++;
            awayTeam.lost++;

            homeTeam.morale += 2;
            awayTeam.morale -= 2;
            break;
        case 'away':
            awayTeam.points += 3;

            awayTeam.won++;
            homeTeam.lost++;

            homeTeam.morale -= 2;
            awayTeam.morale += 2;
            break;
        case 'drawn':
            homeTeam.drawn++;
            awayTeam.drawn++;

            homeTeam.points++;
            awayTeam.points++;

            homeTeam.morale += 1;
            awayTeam.morale += 1;
            break;
        default:
            break;
    }

    return {
        homeTeam,
        awayTeam
    };
}

function getMatchesOfWeek(fixture, week) {
    var matches = fixture.filter(function (match) {
        return match.week === week;
    }).filter(Boolean);

    return matches;
}

function setAndReturnTeams() {
    var teams = [{
        "id": "int",
        "name": "Inter",
        "playerQuality": 8,
        "tactics": "off",
        "attack": 8,
        "defence": 8,
        "fanSupport": 6,
        "won": 0,
        "lost": 0,
        "drawn": 0,
        "points": 0,
        "played": 0,
        "goalsFor": 0,
        "goalsAgainst": 0,
        "goalDifference": 0,
        "morale": 10,
        "championshipChance": "soon"
    }, {
        "id": "fen",
        "name": "Fenerbahçe",
        "playerQuality": 7,
        "tactics": "off",
        "attack": 6,
        "defence": 7,
        "fanSupport": 9,
        "won": 0,
        "lost": 0,
        "drawn": 0,
        "points": 0,
        "played": 0,
        "goalsFor": 0,
        "goalsAgainst": 0,
        "goalDifference": 0,
        "morale": 10,
        "championshipChance": "soon"
    }, {
        "id": "psv",
        "name": "PSV Eindhoven",
        "playerQuality": 6,
        "tactics": "off",
        "attack": 6,
        "defence": 5,
        "fanSupport": 4,
        "won": 0,
        "lost": 0,
        "drawn": 0,
        "points": 0,
        "played": 0,
        "goalsFor": 0,
        "goalsAgainst": 0,
        "goalDifference": 0,
        "morale": 10,
        "championshipChance": "soon"
    }, {
        "id": "cska",
        "name": "CSKA Moskova",
        "playerQuality": 4,
        "tactics": "def",
        "attack": 5,
        "defence": 4,
        "fanSupport": 5,
        "won": 0,
        "lost": 0,
        "drawn": 0,
        "points": 0,
        "played": 0,
        "goalsFor": 0,
        "goalsAgainst": 0,
        "goalDifference": 0,
        "morale": 10,
        "championshipChance": "soon"
    }];

    localStorage.setItem('teams', JSON.stringify(teams));

    return teams;
}

export default {
    createAndSetFixture,
    setAndReturnTeams,
    sortTeams,
    playMatch,
    getMatchesOfWeek,
    setMatchStatistics,
    undoMatchStatistics,
    simulateAllMatches,
    calculateChampionshipChanceAndSet,
    calculateDoubleAverage
};