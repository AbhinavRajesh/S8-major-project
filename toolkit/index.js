const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const socketio = require("socket.io");
const socket = require("./socket");
const cors = require("cors");
const { io: ioClient, io } = require("socket.io-client");

const apiRoutes = require("./routes/api");
const { serverConfig } = require("./config");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT::${PORT}`);
});

const activeConnections = {
  serverEndpoint: serverConfig.serverEndpoint,
  clients: {},
};
const ioServer = socketio(server, {
  cors: {
    origin: "*",
  },
});

if (activeConnections.serverEndpoint) {
  ioClient.on("connect", () => {
    console.log("Connected to the server of the user");
  });

  ioClient.on("data", (data) => {
    io.emit("server sent", data);
  });
}

app.use("/api", apiRoutes);

socket(ioServer, activeConnections);
