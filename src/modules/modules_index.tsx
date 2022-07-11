import { combineReducers } from "redux";
import register from "./register";

const rootReducer = combineReducers({
    register
})

export default rootReducer;

export type RootState  = ReturnType<typeof rootReducer>