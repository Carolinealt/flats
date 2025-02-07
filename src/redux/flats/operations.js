import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://flats-2.onrender.com';

export const fetchFlats = createAsyncThunk(
    'flats/fetchAll',
    async (_, thunkAPI) => {
        try {
            const { data: data } = await axios.get('/flats', { params: { perPage: 40 } });
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addFlat = createAsyncThunk('flats/addFlat', async (payload, thunkAPI) => {
    try {
        const response = await axios.post('/flats', payload);

        console.log("response", response);


    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);

    }
})