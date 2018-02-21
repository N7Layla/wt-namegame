import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPeople } from './store/people';
import { updateScore } from './store/score';
import './App.css';

let clicks;

class Reverse extends Component {
    constructor() {
    super();
    this.state = {
      isHidden: true,
      message: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    clicks = 5;
  }

  handleClick(evt) {
    if (evt.target.name === this.props.answer.firstName + " " + this.props.answer.lastName) {
      this.props.updateScore(clicks);
      this.setState({isHidden: false, message: 'You did it!'});
      this.props.fetchPeople();
    } else {
      clicks--;
      this.setState({isHidden: false, message: 'Nope!'});
    }
  }

  render() {
    let five = this.props.five;
    let answer = this.props.answer;

    return (
      <div className="App">
        <div className="App-intro">
          <h2>Find...</h2>
          <div>
          <img src={answer.headshot.url} alt={answer.firstName + " " + answer.lastName} height='200px' />
          {!this.state.isHidden &&
              <div id="caption">{this.state.message}</div>}
              </div>
          <p>Your score: {this.props.score ? this.props.score : ''}</p>
        { five[0] ?
          <div className="names">
          {five.map(person =>
            <button key={person.id} onClick={this.handleClick} name={person.firstName + " " + person.lastName}>{person.firstName + " " + person.lastName}
              </button>
          )}
          </div>
          : ''
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({people, score}) => ({people, score})
const mapDispatchToProps = { fetchPeople, updateScore }

export default connect(mapStateToProps, mapDispatchToProps)(Reverse);
