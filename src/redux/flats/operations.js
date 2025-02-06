import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://flats-1.onrender.com';

export const fetchFlats = createAsyncThunk(
    'flats/fetchAll',
    async (_, thunkAPI) => {
        try {
            const { data: data } = await axios.get('/flats');
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);