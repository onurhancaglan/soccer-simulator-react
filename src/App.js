import React from 'react';
import FixtureTable from './Components/FixtureTable';
import LeagueTable from './Components/LeagueTable';
import PlayButtons from './Components/PlayButtons';
import ChampionshipChanceTable from './Components/ChampionshipChanceTable';
import helpers from './Components/helpers'

class App extends React.Component {
  constructor(prop) {
    super(prop);

    var storageFixture = JSON.parse(localStorage.getItem('fixture') || '[]') || [];
    var storageTeams = JSON.parse(localStorage.getItem('teams') || '[]') || [];
    var currentWeek = parseInt(localStorage.getItem('currentWeek')) || 0;
    var fixture = storageFixture.length > 0 ? storageFixture : helpers.createAndSetFixture(6);

    localStorage.setItem('currentWeek', currentWeek);
    
    this.state = {
      fixture: fixture,
      teams: storageTeams.length > 0 ? storageTeams : helpers.setAndReturnTeams(),
      viewedMatches: helpers.getMatchesOfWeek(fixture, 1),
      currentWeek: currentWeek,
      viewedWeek: 1
    };
  }

  handleUpdateClick = (newMatch) => {
    var storageFixture = JSON.parse(localStorage.getItem("fixture"));
    var updatedMatch = storageFixture.filter((match) => match.id === newMatch.matchId)[0];

    if (updatedMatch.isPlayed) {
      var fixtureWithoutMatchToUpdate = storageFixture.filter((match) => match.id !== newMatch.matchId);
      var homeTeam = this.state.teams.filter((team) => team.name === updatedMatch.home)[0];
      var awayTeam = this.state.teams.filter((team) => team.name === updatedMatch.away)[0];
      var teamsWithoutTeamsToUpdate = this.state.teams
        .filter((team) => team.name !== updatedMatch.home && team.name !== updatedMatch.away);
      var newTeams = helpers.undoMatchStatistics(homeTeam, awayTeam, updatedMatch);

      updatedMatch.homeGoal = newMatch.homeGoal;
      updatedMatch.awayGoal = newMatch.awayGoal;
      fixtureWithoutMatchToUpdate.push(updatedMatch);
      fixtureWithoutMatchToUpdate.sort((a, b) => parseInt(a.id) - parseInt(b.id));

      newTeams = helpers.setMatchStatistics(newTeams.homeTeam, newTeams.awayTeam, updatedMatch);
      teamsWithoutTeamsToUpdate.push(newTeams.homeTeam);
      teamsWithoutTeamsToUpdate.push(newTeams.awayTeam);
      teamsWithoutTeamsToUpdate = helpers.sortTeams(teamsWithoutTeamsToUpdate);

      if (this.state.currentWeek > 2) {
        var weekRemaining = (fixtureWithoutMatchToUpdate.length / 2) - this.state.currentWeek;

        teamsWithoutTeamsToUpdate = helpers.calculateChampionshipChanceAndSet(weekRemaining, teamsWithoutTeamsToUpdate);
      }

      localStorage.setItem("fixture", JSON.stringify(fixtureWithoutMatchToUpdate));
      localStorage.setItem("teams", JSON.stringify(teamsWithoutTeamsToUpdate));

      this.setState({
        fixture: fixtureWithoutMatchToUpdate,
        teams: teamsWithoutTeamsToUpdate
      });
    }
  }

  handleGoalInputChange = (newMatch) => {
    var tempMatch = this.state.viewedMatches.filter((match) => match.id === newMatch.matchId)[0];
    var removedMatches = this.state.viewedMatches.filter((match) => match.id !== newMatch.matchId);

    tempMatch.homeGoal = newMatch.homeGoal;
    tempMatch.awayGoal = newMatch.awayGoal;

    removedMatches.push(tempMatch);
    removedMatches.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    this.setState({
      viewedMatches: removedMatches
    });
  }

  handePlayButtonClick = (playedMatch, teams) => {
    var removedFixture = JSON.parse(localStorage.getItem("fixture") || '[]')
      .filter((fixtureMatch) => fixtureMatch.id !== playedMatch.id);
    var newWeek = this.state.currentWeek + 1;

    removedFixture.push(playedMatch);

    if (newWeek > 2) {
      var weekRemaining = (removedFixture.length / 2) - newWeek;

      teams = helpers.calculateChampionshipChanceAndSet(weekRemaining, teams);
    }

    localStorage.setItem("fixture", JSON.stringify(removedFixture));
    localStorage.setItem('currentWeek', newWeek);
    localStorage.setItem('teams', JSON.stringify(teams));

    this.setState({
      fixture: removedFixture,
      teams: teams,
      currentWeek: newWeek,
      viewedWeek: newWeek,
      viewedMatches: helpers.getMatchesOfWeek(removedFixture, newWeek)
    });
  }

  handleClickNext = () => {
    if (this.state.viewedWeek < 6) {
      var storageFixture = JSON.parse(localStorage.getItem('fixture') || '[]') || [];

      this.setState({
        viewedWeek: this.state.viewedWeek + 1,
        viewedMatches: helpers.getMatchesOfWeek(storageFixture, this.state.viewedWeek + 1)
      });
    }
  }

  handleClickPast = () => {
    if (this.state.viewedWeek > 1) {
      var storageFixture = JSON.parse(localStorage.getItem('fixture') || '[]') || [];

      this.setState({
        viewedWeek: this.state.viewedWeek - 1,
        viewedMatches: helpers.getMatchesOfWeek(storageFixture, this.state.viewedWeek - 1)
      });
    }
  }

  handleSimulateAllMatches = (leagueEndData) => {
    var lastWeek = leagueEndData.newFixture.length / 2;

    localStorage.setItem("fixture", JSON.stringify(leagueEndData.newFixture));
    localStorage.setItem('currentWeek', lastWeek);
    localStorage.setItem('teams', JSON.stringify(leagueEndData.newTeams));

    helpers.calculateChampionshipChanceAndSet(0, leagueEndData.newTeams);

    this.setState({
      fixture: leagueEndData.newFixture,
      teams: leagueEndData.newTeams,
      currentWeek: lastWeek,
      viewedWeek: lastWeek,
      viewedMatches: helpers.getMatchesOfWeek(leagueEndData.newFixture, lastWeek)
    });
  }

  handleRestart = () => {
    localStorage.setItem('fixture', '');
    localStorage.setItem('currentWeek', '0');
    localStorage.setItem('teams', '');

    var fixture = helpers.createAndSetFixture(6);
    var teams = helpers.setAndReturnTeams();

    this.setState({
      fixture: fixture,
      teams: teams,
      currentWeek: 0,
      viewedWeek: 1,
      viewedMatches: helpers.getMatchesOfWeek(fixture, 1)
    });
  }

  render() {
    return (
      <div className="App">
        <FixtureTable fixture={this.state.fixture} onUpdateClick={this.handleUpdateClick}
          onClickNext={this.handleClickNext} onGoalInputChange={this.handleGoalInputChange}
          onClickPast={this.handleClickPast} teams={this.state.teams} viewedMatches={this.state.viewedMatches}
        />
        <LeagueTable teams={this.state.teams} currentWeek={this.state.currentWeek} fixture={this.state.fixture}/>
        <PlayButtons teams={this.state.teams} fixture={this.state.fixture} currentWeek={this.state.currentWeek}
          onPlayButtonClick={this.handePlayButtonClick} onSimulateAllMatches={this.handleSimulateAllMatches}
          onRestart={this.handleRestart}
        />
        <ChampionshipChanceTable teams={this.state.teams} />
      </div>
    );
  };
}

export default App;