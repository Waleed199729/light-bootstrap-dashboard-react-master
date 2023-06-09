import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state = initialState, action) => {
      //   debugger;
      // console.log(action);                              //creating the action
      state.push(action.payload); // console.log(action);
    },

    editUser: (state = state, action) => {
      console.log("action edit user", action.payload);
      debugger;
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return { ...action.payload };
          debugger;
        }
        return action.payload;
      });
      console.log("waleed ahmad user:", ...user);
    },

    deleteUser: (state, action) => {
      const id = action.payload; //yahan se ham data nikal arahe hain jo action ke payload me aya ha
      debugger;
      const du = state.filter((user) => user.id == id);
      if (du) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions; // we are exporting the actions
export default userSlice.reducer;
