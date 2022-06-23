import { combineReducers } from "@reduxjs/toolkit";
import search from "./searchSlice";
import cart from "./cartSlice";

const appReducers = combineReducers({
    search,
    cart
});

export default appReducers;
