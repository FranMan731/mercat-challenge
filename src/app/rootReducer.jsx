import { combineReducers } from "@reduxjs/toolkit";
import app from "./reducers";

/**
 * Combine reducers
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript
 */
export const rootReducer = combineReducers({
    app
});