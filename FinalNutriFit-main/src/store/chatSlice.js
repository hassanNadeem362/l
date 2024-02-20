import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    chat: {
      _id:"",
      chatName: "",
      users: [],
    }
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:  {
      chatUser: (state, action) => {
            state.user = action.payload;
      },
      storeChat: (state, action) => {
            state.chat = action.payload
      }
    }
})

export const {chatUser, storeChat} = chatSlice.actions;
export default chatSlice.reducer;