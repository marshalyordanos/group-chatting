import { createSlice, PayloadAction } from '@reduxjs/toolkit'




export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
      token:"",
      data:null,
      err:null,
      message:null,
      chat:[]
  },
  reducers: {
    getData: (state,action) => {
      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token =action.payload?.token || ""
      state.data = action.payload?.data || null
      state.err = action.payload?.err || null
      state.message = action.payload?.message|| null
      

     
    },
    setChat: (state,action) => {
      state.chat = action.payload
      

     
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { getData, setChat  } = counterSlice.actions

export default counterSlice.reducer