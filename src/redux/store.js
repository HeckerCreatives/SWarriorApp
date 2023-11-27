import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users";
import arena from "./slices/arena";
import arenaVideos from "./slices/arenaVideos";
import currentRoundBets from "./slices/currentRoundBets";
import commissionRequest from "./slices/commissionRequest";
import gameHistory from "./slices/gameHistory";
import roundStatus from "./slices/roundStatus";
import cashin from "./slices/cashin";
import cashout from "./slices/cashout";
import convertCommision from "./slices/convertCommision";
import transferPoints from "./slices/transferPoints";
import commissionHistory from "./slices/commissionHistory";
import websockets from './slices/socket'
import notification from './slices/notification'

export const store = configureStore({
  reducer: {
    users,
    arena,
    arenaVideos,
    currentRoundBets,
    commissionRequest,
    gameHistory,
    roundStatus,
    cashin,
    cashout,
    convertCommision,
    transferPoints,
    commissionHistory,
    sockets: websockets,
     notification
  },
});
