import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPeople } from './store/people'
import { updateScore } from './store/score'
import Play from './Play';
import Reverse from './Reverse';
import Spell from './Spell';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      mattMode: false,
      reverse: false,
      spell: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPeople();
    this.props.updateScore(0);
  }

  handleClick(evt) {
    if (evt.target.value === 'reverse') {
      this.setState({reverse: true})
    } else if (evt.target.value === 'matt') {
      this.setState({mattMode: true})
    } else if (evt.target.value === 'spell') {
      this.setState({spell: true})
    } else {
      this.setState({reverse: false, mattMode: false, spell: false})
    }
  }

  render() {

    let staff = this.props.people || [];
    let five = staff.slice(0,5);
    let nameAnswer = five[Math.floor(Math.random()*5)];
    let mattFive = staff.filter(person => {
      return person.firstName === 'Matthew' || person.firstName === 'Matt' || person.firstName === 'Mat'
    }).slice(0,5);
    let matt = mattFive[Math.floor(Math.random()*5)];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Name Game</h1>
          <button onClick={this.handleClick} value='norm'>Play Normal</button>
          <button onClick={this.handleClick} value='matt'>Matt Mode</button>
          <button onClick={this.handleClick} value='reverse'>Reverse Mode</button>
          <button onClick={this.handleClick} value='spell'>Spelling Mode</button>
        </header>
        {this.state.mattMode ? <Play five={mattFive} answer={matt} /> :
          this.state.reverse ? <Reverse five={five} answer={nameAnswer} /> :
          this.state.spell ? <Spell answer={nameAnswer} /> :
           <Play five={five} answer={nameAnswer} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({people, score}) => ({people, score})
const mapDispatchToProps = { fetchPeople, updateScore }

export default connect(mapStateToProps, mapDispatchToProps)(App);
