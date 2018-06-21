import _ from 'lodash';

const individualCase = (state, action) => {
  switch (action.type) {
    case 'GET_CASE_ITEMS_RECEIVED':
      if (state.id == action.caseId) {
        return Object.assign({}, state, { items: action.items });
      } else {
        return state;
      }
    default:
      return state;
  }
};

const cases = (state = [], action) => {
  switch (action.type) {
    case 'GET_CASES_RECEIVED':
      return action.data;
    case 'GET_CASE_ITEMS_RECEIVED':
      return state.map(kase => {
        return individualCase(kase, action);
      });
    case 'SHUFFLE_CASES':
      return _.shuffle(state);
    default:
      return state;
  }
};

export default cases;
