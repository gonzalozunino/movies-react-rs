import * as rating from "./rating";
import * as types from "../actions/types";

const createReducer = (handlers) => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

export default createReducer({
  [types.SET_RATING]: rating.setRating,
});
