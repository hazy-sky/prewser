const initialState = {
  displayed: false,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return Object.assign({}, state, {
        displayed: true,
      });

    case "CLOSE_SIDEBAR":
      return Object.assign({}, state, {
        displayed: false,
      });

    case "TOGGLE_SIDEBAR":
      return Object.assign({}, state, {
        displayed: !state.displayed,
      });

    default:
      return state;
  }
};

export default surveyReducer;
