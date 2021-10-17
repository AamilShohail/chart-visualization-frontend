import { configureStore } from "@reduxjs/toolkit";
import sheetReducer from './sheet'
import uiReducer from './ui'

const store = configureStore({
    reducer:{
        sheet:sheetReducer,
        ui:uiReducer
    }
});

export default store;
