import axios from 'axios';

const shuffle = (array) => {
      // Fisher-Yates Shuffle!
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
}

const url = 'https://willowtreeapps.com/api/v1.0/profiles/';

const GET_PEOPLE = 'GET_PEOPLE';

const getPeople = people => ({type: GET_PEOPLE, people});

export const fetchPeople = () => (dispatch) => {
  axios.get('https://willowtreeapps.com/api/v1.0/profiles/')
  .then(res => {
    let current = res.data.filter(person => person.jobTitle && person.headshot.url)
    dispatch(getPeople(shuffle(current)))
  })
  .catch(err => console.error(err))
}

export default function reducer(people = [], action) {
  switch (action.type) {
    case GET_PEOPLE:
      return action.people;
    default:
      return people;
  }
}
