import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    oktaData: null,
    databaseData: null,
    sellerData: null, // Add a new field for seller data
  },
  reducers: {
    setOktaData: (state, action) => {
      state.oktaData = action.payload;
    },
    setDatabaseData: (state, action) => {
      state.databaseData = action.payload;
    },
    setSellerData: (state, action) => {
      state.sellerData = action.payload;
    },
    clearUserData: (state) => {
      state.oktaData = null;
      state.databaseData = null;
      state.sellerData = null;
    },
  },
});

export const {
  setOktaData,
  setDatabaseData,
  setSellerData, // Add the new action for setting seller data
  clearUserData,
} = dataSlice.actions;

export const selectOktaData = (state) => state.data.oktaData;
export const selectDatabaseData = (state) => state.data.databaseData;
export const selectSellerData = (state) => state.data.sellerData; // Add the selector for seller data
export default dataSlice.reducer;
