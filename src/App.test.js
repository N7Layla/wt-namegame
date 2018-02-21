import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import store from './store';
import {updateScore} from './store/score';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('test action creators',()=>{
    it('updates the score', () => {
        const add = updateScore(5)
        expect(add).toEqual({type:"UPDATE_SCORE",score:5})
    });
});
