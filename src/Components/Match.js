import React from 'react';

class Match extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            homeGoal: 0,
            awayGoal: 0,
            matchId: '',
            isPlayed: false
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        if (state.homeGoal !== props.homeGoal ||
            state.awayGoal !== props.awayGoal) {
            return {
                homeGoal: props.match.homeGoal,
                awayGoal: props.match.awayGoal,
                matchId: props.match.id,
                isPlayed: props.match.isPlayed
            };
        } else {
            return null;
        }
    }

    handleInputChange = (e) => {
        if (this.state.isPlayed) {
            var goal = parseInt(e.target.value);
            var newMatch = {
                homeGoal: this.state.homeGoal,
                awayGoal: this.state.awayGoal,
                matchId: e.target.attributes['matchid'].value
            };

            if (goal >= 0) {
                if (e.target.id === 'home') {
                    this.setState({
                        homeGoal: goal
                    });

                    newMatch.homeGoal = goal;
                } else {
                    this.setState({
                        awayGoal: goal
                    });

                    newMatch.awayGoal = goal;
                }
            }

            this.props.onInputChange(newMatch);
        }
    }

    handleUpdateScores = () => this.props.onUpdateClick(this.state);

    render() {
        return (
            <tr key={this.props.match.id} id={this.props.match.id}>
                <td name="home">
                    {this.props.match.home}
                    <input
                        type="number"
                        id="home"
                        value={this.state.homeGoal}
                        onChange={this.handleInputChange}
                        team={this.props.match.home}
                        matchid={this.props.match.id}
                    />
                </td>
                <td name="away">
                    <input
                        type="number"
                        id="away"
                        value={this.state.awayGoal}
                        onChange={this.handleInputChange}
                        team={this.props.match.away}
                        matchid={this.props.match.id}
                    />
                    {this.props.match.away}
                </td>
                <td>
                    <button onClick={this.handleUpdateScores} disabled={!this.state.isPlayed}>UPDATE</button>
                </td>
            </tr>
        );
    }
}

export default Match;