import React from 'react';
import helpers from './helpers';

class LeagueTable extends React.Component {
    render() {
        var teams = helpers.sortTeams(this.props.teams);

        if (this.props.currentWeek === 0) {
            teams = teams.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        }

        //todo: if equal, elimination match
        // var result = helpers.calculateDoubleAverage(teams[0], teams[1], this.props.fixture);

        // if (result !== 'equal') {
        //     teams = teams.filter((team) => team.name === result);
        // }

        return (
            <table>
                <thead>
                    <tr>
                        <td>NAME</td>
                        <td>PLAYED</td>
                        <td>WON</td>
                        <td>DRAWN</td>
                        <td>LOST</td>
                        <td>GF</td>
                        <td>GA</td>
                        <td>GD</td>
                        <td>POINTS</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        teams.map(function (team) {
                            return (
                                <tr key={team.name}>
                                    <td>{team.name}</td>
                                    <td>{team.played}</td>
                                    <td>{team.won}</td>
                                    <td>{team.drawn}</td>
                                    <td>{team.lost}</td>
                                    <td>{team.goalsFor}</td>
                                    <td>{team.goalsAgainst}</td>
                                    <td>{team.goalDifference}</td>
                                    <td>{team.points}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    };
};

export default LeagueTable;