import React, { Component} from 'react';
import {connect} from 'react-redux';
import Pic from './Pic';
import './App.css';

class Play extends Component {
  render() {
    let five = this.props.five;
    let nameAnswer = this.props.answer;

    return (
      <div className="App">
        <div className="App-intro">
          <h2>Find...{nameAnswer ? nameAnswer.firstName + ' ' + nameAnswer.lastName : ''}!</h2>
          <p>Your score: {this.props.score ? this.props.score : ''}</p>
        { five[0] ?
          <div className="pics">
          {five.map(person =>
            <Pic key={person.id} selected={person} answer={nameAnswer.firstName + ' ' + nameAnswer.lastName} />
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
const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(Play);
