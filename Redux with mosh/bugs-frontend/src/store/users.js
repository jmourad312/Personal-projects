import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    //actions => action handlers
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
    userRemoved: (users, action) => {
      const index = users.findIndex((bug) => bug.id === action.payload.id);
      users.splice(index, 1);
    },
  },
});
export const { userAdded, userRemoved } = slice.actions;
export default slice.reducer;
