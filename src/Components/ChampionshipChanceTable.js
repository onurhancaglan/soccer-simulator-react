import React from 'react';
import helper from './helpers';

class ChampionshipChanceTable extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>TEAM</td>
                        <td>CHANCE</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        helper.sortTeams(this.props.teams).map(function (team) {
                            return (
                                <tr key={team.name}>
                                    <td>{team.name}</td>
                                    <td>{team.championshipChance}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    };
};

export default ChampionshipChanceTable;