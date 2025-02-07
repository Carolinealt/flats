import { createSlice } from "@reduxjs/toolkit";
import { addFlat, fetchFlats } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
    console.log("handlePending");

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
                state.items = payload.data.data;
            })
            .addCase(fetchFlats.rejected, handleRejected)
            .addCase(addFlat.pending, handlePending)
            .addCase(addFlat.fulfilled, (state, { payload }) => {
                console.log('slice');

            })
            .addCase(addFlat.rejected, handleRejected)
    }
})

export default flatsSlice.reducer;
