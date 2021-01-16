import React from "react";
import Match from "./Match";

class FixtureButtonGroup extends React.Component {
  handleNextWeek = () => this.props.onNextWeekClick();
  handlePastWeek = () => this.props.onPastWeekClick();

  render() {
    return (
      <tr>
        <td>
          <input
            type="button"
            value="PAST WEEK"
            onClick={this.handlePastWeek}
          />
          <input
            type="button"
            value="NEXT WEEK"
            onClick={this.handleNextWeek}
          />
        </td>
      </tr>
    );
  }
}

class FixtureTable extends React.Component {
  handleNextWeekClick = () => this.props.onClickNext();
  handlePastWeekClick = () => this.props.onClickPast();
  handleUpdateClick = (newMatch) => this.props.onUpdateClick(newMatch);
  handleGoalChange = (newMatch) => this.props.onGoalInputChange(newMatch);

  render() {
    var matches = this.props.viewedMatches.map((match) => {
      return <Match match={match} key={match.id} onInputChange={this.handleGoalChange}
        onUpdateClick={this.handleUpdateClick} />;
    });

    return (
      <table>
        <thead>
          <tr>
            <td>HOME</td>
            <td></td>
            <td>AWAY</td>
            <td></td>
          </tr>
        </thead>
        <tbody>{matches}</tbody>
        <tfoot>
          <FixtureButtonGroup
            onNextWeekClick={this.handleNextWeekClick}
            onPastWeekClick={this.handlePastWeekClick}
          />
        </tfoot>
      </table>
    );
  }
}

export default FixtureTable;
