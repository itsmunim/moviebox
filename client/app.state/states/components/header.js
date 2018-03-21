import ActionTypes from '../../action.types.js';

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

  static reduce(previousState, action) {
    let newState = Object.assign({}, previousState);

    switch (action.type) {
      case ActionTypes.HEADER__SETTINGS_OPEN:
        newState.isSettingsGearSelected = true;
        return newState;

      case ActionTypes.HEADER__SETTINGS_CLOSE:
        newState.isSettingsGearSelected = false;
        return newState;

      default:
        return previousState || {};
    }
  }

  static updateSettingsNavIsSelected(state, isSelected) {
    state.settingsNav = Object.assign({}, state.settingsNav, {isSelected: isSelected});
    return state;
  }
}

export default HeaderState;
