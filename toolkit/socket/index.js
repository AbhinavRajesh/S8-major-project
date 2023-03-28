const { handleNewClient, handleDeleteClient } = require("./client");
const handleCoordinates = require("./coordinates");
const handleStream = require("./stream");
const handleVoiceChannel = require("./voice");

// Object of all active projects
const socket = (io, connections) => {
  io.on("connection", (socket) => {
    console.log("Made socket connection: ", socket.id);
    handleNewClient(socket, connections);

    if (socket.id !== connections.admin) {
      // only the first time when joined,
      // the seek time is synced with server
      socket.emit("stream", JSON.stringify(connections));
    }

    socket.on("stream", (data) => handleStream(data, connections, socket.id));

    socket.on("coordinates", (data) =>
      handleCoordinates(data, connections, socket.id)
    );
    socket.on("voice", (data) =>
      handleVoiceChannel(data, io, socket, connections)
    );
    socket.on("disconnect", () => handleDeleteClient(connections, socket.id));
  });

  // Send all project data to every client on every 5 seconds
  setInterval(() => {
    console.log("Emitting: ", connections);
    io.emit("connections", JSON.stringify(connections));
    handleEmitToServers(connections);
  }, 500);
};

const handleEmitToServers = (connections) => {
  if (connections?.serverEndpoint) {
    connections?.serverEndpoint?.emit("sync", JSON.stringify(connections));
  }
};

module.exports = socket;
