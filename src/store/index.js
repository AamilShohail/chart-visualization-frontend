import { configureStore } from "@reduxjs/toolkit";
import sheetReducer from './sheet-slice'
import uiReducer from './ui'
import authReducer from './auth-slice'

const store = configureStore({
    reducer:{
        sheet:sheetReducer,
        ui:uiReducer,
        auth:authReducer
    }
});

export default store;
