import { configureStore } from '@reduxjs/toolkit';
import flatsReducer from './flats/flatsSlice'
export const store = configureStore({
    reducer: {
        flats: flatsReducer,
    },
});
