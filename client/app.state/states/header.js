import ActionTypes from '../action.types.js';

class HeaderState {
  static showSettings() {
    return {
      type: ActionTypes.HEADER__SETTINGS_OPEN
    };
  }

  static hideSettings() {
    return {
      type: ActionTypes.HEADER__SETTINGS_CLOSE
    };
  }

  static getCurrent(stateManager) {
    return stateManager.getStateFor('header');
  }

  static reduce(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.HEADER__SETTINGS_OPEN:
        return HeaderState.updateSettingsNavIsSelected(newState, true);

      case ActionTypes.HEADER__SETTINGS_CLOSE:
        return HeaderState.updateSettingsNavIsSelected(newState, false);

      default:
        return previousState || {};
    }
  }

  static updateSettingsNavIsSelected(state, isSelected) {
    let settingsNavState = Object.assign({}, state.settingsNav);
    settingsNavState.isSelected = isSelected;
    state.settingsNav = settingsNavState;
    return state;
  }
}

export default HeaderState;
