const UPDATE_SCORE = 'UPDATE_SCORE';

export const updateScore = score => ({type: UPDATE_SCORE, score});

export default function reducer(score = 0, action) {
  switch (action.type) {
    case UPDATE_SCORE:
      return score + action.score;
    default:
      return score;
  }
}
