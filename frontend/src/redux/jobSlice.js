import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [], // array of all jobs
    allAdminJobs: [],
    singleJob: null, // single job state
  },
  reducers: {
    // Update all jobs
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    // Update single job
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state , action) => {
      state.allAdminJobs = action.payload;
    }
  },
});

// Export both actions
export const { setAllJobs, setAllAdminJobs ,setSingleJob } = jobSlice.actions;

export default jobSlice.reducer;
