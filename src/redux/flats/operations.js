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
        const { data: data } = await axios.post('/flats', payload);

        return data.data;
    } catch (e) {
        console.log(e);

        return thunkAPI.rejectWithValue(e.message);

    }
})

export const deleteFlat = createAsyncThunk('flats/deleteFlat', async (payload, thunkAPI) => {
    try {
        const response = await axios.delete(`/flats/${payload}`);

        return { data: response.data, id: payload };
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const patchFlat = createAsyncThunk('flats/patchFlat', async (payload, thunkAPI) => {
    try {
        const { _id, formData } = payload;

        const { data: data } = await axios.patch(`/flats/${_id}`, formData);
        console.log(data.data);

        return data.data;
    } catch (e) {
        console.log(e);

        return thunkAPI.rejectWithValue(e.message);

    }
})