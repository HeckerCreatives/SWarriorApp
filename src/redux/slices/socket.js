import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    amount: '', 
     response: {}
}

const socketSlice = createSlice({
    name: 'socketData',
    initialState,
    reducers:{
        dataAdded: (state, action) => {
            state.amount = action.payload,
            state.response = {...state.response, ...action.payload}
        }
    }
})


export const selectAllSocketdata = (state) => state.sockets;
export const {dataAdded} = socketSlice.actions
export default socketSlice.reducer