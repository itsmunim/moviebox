import {createStore} from 'redux';
import stateReducer from './reducer';

class StateManager {
  static __instance;

  constructor(reducer) {
    this._store = createStore(reducer);
  }

  subscribeToStateChange(callback) {
    this._store.subscribe(callback);
  }

  dispatchAction(action) {
    this._store.dispatch(action);
  }

  getStateFor(componentKey) {
    return this._store.getState()[componentKey];
  }

  getState() {
    return this._store.getState();
  }

  static getInstance() {
    if (StateManager.__instance) {
      return StateManager.__instance;
    }
    StateManager.__instance = new StateManager(stateReducer);
    return StateManager.__instance;
  }
}

export default StateManager;
