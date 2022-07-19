import { combineReducers } from "redux";
import login from "./login";
import register  from "./register";
import confirmId  from "./confirmId";

const rootReducer = combineReducers({
    login,
    register,
    confirmId,
})

export default rootReducer;

export type RootState  = ReturnType<typeof rootReducer>