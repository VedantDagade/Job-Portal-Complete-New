import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "comapny",
  initialState: {
    singleCompany:null,
  },
  reducers:{
    //actions
    setSingleCompany: (state,action) => {
      state.singleCompany = action.payload;
    }
  }
});


export const {setSingleCompany} = companySlice.actions;

export default companySlice.reducer;