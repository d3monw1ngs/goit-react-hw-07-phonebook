import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = '';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
       setFilter(_state, action) {
        return action.payload;
       },
    },
});

export const { setFilter } = filterSlice.actions; 
