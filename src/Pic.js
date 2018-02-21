import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPeople } from './store/people';
import { updateScore } from './store/score';

let clicks;

class Pic extends Component {
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
    if (evt.target.name === this.props.answer) {
      this.props.updateScore(clicks);
      this.setState({isHidden: false, message: 'You did it!'}, console.log(this.state));
      this.props.fetchPeople();
    } else {
      clicks--;
      this.setState({isHidden: false, message: 'Nope, that\'s ' + evt.target.name}, console.log(this.state));
    }
  }

  render() {
    let url = this.props.selected.headshot.url;
    let name = this.props.selected.firstName + " " + this.props.selected.lastName;
    return (
      <div className="headshot" width="200px">
        <img alt={name} src={url} onClick={this.handleClick} name={name} height="200px" />
        {!this.state.isHidden && <div id="caption">{this.state.message}</div>}
      </div>
    )
  }
}

const mapStateToProps = ({people, score}) => ({people, score})
const mapDispatchToProps = { fetchPeople, updateScore }

export default connect(mapStateToProps, mapDispatchToProps)(Pic);
