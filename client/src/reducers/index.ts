import { combineReducers } from "redux";
import surveyReducer from "./surveyReducer";

export const rootReducer = combineReducers({
  survey: surveyReducer,
});
