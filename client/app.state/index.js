import StateManager from './store';

const getStateManager = () => {
  return StateManager.getInstance();
};

export {getStateManager};
