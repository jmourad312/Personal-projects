import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    //actions => action handlers
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
    projectRemoved: (projects, action) => {
      const index = projects.findIndex((bug) => bug.id === action.payload.id);
      projects.splice(index, 1);
    },
  },
});
export const { projectAdded, projectRemoved } = slice.actions;
export default slice.reducer;
