import { createSlice } from "@reduxjs/toolkit";
import { addFlat, deleteFlat, fetchFlats, patchFlat } from "./operations";

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
        error: null,
        isModal: false,
        selectedFlatData: {}
    },
    reducers: {
        toggleModal: (state, action) => {
            return { ...state, isModal: !state.isModal }
        },
        editFlatData: (state, { payload }) => {
            return { ...state, selectedFlatData: payload }
        }
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
                state.isLoading = false;
                state.error = null;
                state.items.push(payload)
            })
            .addCase(addFlat.rejected, handleRejected)
            .addCase(deleteFlat.pending, handlePending)
            .addCase(deleteFlat.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.items = state.items.filter(el => el._id !== payload.id)
            })
            .addCase(deleteFlat.rejected, handleRejected)
            .addCase(patchFlat.pending, handlePending)
            .addCase(patchFlat.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.items = state.items.filter(el => el._id !== payload.id)
            })
            .addCase(patchFlat.rejected, handleRejected)
    }
});

export const { toggleModal, editFlatData } = flatsSlice.actions;

export default flatsSlice.reducer;
