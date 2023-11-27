import {createSlice} from '@reduxjs/toolkit'

const initialState = [
             {
        arena: "",
        betAmount: 0,
        id: "",
        index: 0,
        points: 0,
        round: 0,
     }
    ]



const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        notificationAdded: (state, action) => {
            // state.amount = action.payload,
            // state.response = {...state.response, ...action.payload}
            state.push(action.payload)
        },

        prepare(arena, betAmount, id, index, points, round){
            return{
                payload:{
                    arena,
                    betAmount,
                    id,
                    index,
                    points,
                    round
                }
            }
        }


    }
})


export const selectAllNotificationData = (state) => state.notification;
export const {notificationAdded} = notificationSlice.actions
export default notificationSlice.reducer