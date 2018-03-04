import HeaderState from './states/header';

const stateReducer = (previousState, action) => {
  let newState = Object.assign({}, previousState);
  newState.header = HeaderState.update(newState.header, action);
  return newState;
};

export default stateReducer;
