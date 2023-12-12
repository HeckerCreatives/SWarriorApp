import io from "socket.io-client";
import { SOCKET_ENDPOINT } from "../utility/utils";

const config = {
  url: SOCKET_ENDPOINT,
  options: {
    transports: ["websocket"],
  },
};

export const socket = io(config.url, config.options);
