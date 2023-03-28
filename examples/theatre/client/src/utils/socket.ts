import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000/";
// const SOCKET_URL = "https://worried-pie-production.up.railway.app"

export const socket = io(SOCKET_URL);
