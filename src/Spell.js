import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPeople } from './store/people';
import { updateScore } from './store/score';
import './App.css';


class Spell extends Component {
    constructor() {
    super();
    this.state = {
      isHidden: true,
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    if (evt.target.value.toLowerCase() === this.props.answer.firstName.toLowerCase() + " " + this.props.answer.lastName.toLowerCase()) {
      this.props.updateScore(10);
      this.setState({isHidden: false, message: 'You did it!'});
    } else {
      this.setState({isHidden: false, message: 'Nope!'});
    }
    evt.preventDefault();
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    let answer = this.props.answer;
    console.log(this.props.answer)
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
          <div>
          <form onSubmit={this.handleSubmit}>
            <label> Enter Name: </label>
              <input onChange={this.handleChange} type="text" name="name" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({people, score}) => ({people, score})
const mapDispatchToProps = { fetchPeople, updateScore }

export default connect(mapStateToProps, mapDispatchToProps)(Spell);
