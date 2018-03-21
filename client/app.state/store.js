import {createStore} from 'redux';
import stateReducer from './reducer';

const store = createStore(stateReducer, {
  components: {},
  pages: {}
});
export default store;
