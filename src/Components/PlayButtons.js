import React from "react";
import helpers from "./helpers";

class PlayButtons extends React.Component {
    handlePlayButton = () => {
        var stableFixture =
            JSON.parse(localStorage.getItem('fixture') || '[]') || [];
        var newWeek = this.props.currentWeek + 1;

        if (newWeek <= this.props.fixture.length / 2) {
            var playMatches = this.props.fixture.filter((match) => {
                return match.week === newWeek;
            });

            playMatches.forEach((match) => {
                var homeTeam = this.props.teams.filter(function (team) {
                    return team.name === match.home;
                })[0];
                var awayTeam = this.props.teams.filter(function (team) {
                    return team.name === match.away;
                })[0];
                var scores = helpers.playMatch(homeTeam, awayTeam);
                var playedMatch = stableFixture.filter(function (fixtureMatch) {
                    return match.id === fixtureMatch.id;
                })[0];
                var newTeams = this.props.teams
                    .filter((team) => team.name !== homeTeam.name && team.name !== awayTeam.name);

                playedMatch.homeGoal = scores.homeGoal;
                playedMatch.awayGoal = scores.awayGoal;
                playedMatch.isPlayed = true;
                var updatedTeams = helpers.setMatchStatistics(homeTeam, awayTeam, playedMatch);

                newTeams.push(updatedTeams.homeTeam);
                newTeams.push(updatedTeams.awayTeam);

                this.props.onPlayButtonClick(playedMatch, newTeams);
            });
        }
    }

    handeSimulateAllButton = () => {
        var leagueEndData = helpers.simulateAllMatches(this.props.fixture, this.props.teams,
            helpers.playMatch, helpers.setMatchStatistics);

        this.props.onSimulateAllMatches(leagueEndData);
    }

    handleRestart = () => {
        this.props.onRestart();
    }

    render() {
        return (
            <div name="play-buttons">
                {
                    this.props.currentWeek < 6 ?
                        <button onClick={this.handlePlayButton}> PLAY NEXT WEEK </button> : null
                }
                {
                    this.props.currentWeek > 0 ?
                        <button onClick={this.handleRestart}> RESTART </button> : null
                }
                {
                    this.props.currentWeek < 5 ?
                        <button onClick={this.handeSimulateAllButton}> SİMULATE ALL MATCH</button> : null
                }
            </div>
        );
    }
}

export default PlayButtons;