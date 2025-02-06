import { createSlice } from "@reduxjs/toolkit";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};


const flatsSlice = createSlice({
    name: 'flats',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFlats.pending, handlePending)
            .addCase(fetchFlats.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.items = payload;
            })
            .addCase(fetchTasks.rejected, handleRejected)
    }
})