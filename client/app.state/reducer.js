import { combineReducers } from 'redux';
import pageStateReducers from './states/pages/index';
import componentsStateReducers from './states/components/index';

export default combineReducers({
  pages: combineReducers(pageStateReducers),
  components: combineReducers(componentsStateReducers)
});
