const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const socketio = require("socket.io");
const socket = require("./socket");

const apiRoutes = require("./routes/api");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(morgan("dev"));

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT::${PORT}`);
});

const activeProjects = {};
const io = socketio(server);
app.use("/api", apiRoutes);

socket(io, activeProjects);
