import * as types from "./types";

export const setRating = (rating) => ({
  type: types.SET_RATING,
  payload: { rating },
});
