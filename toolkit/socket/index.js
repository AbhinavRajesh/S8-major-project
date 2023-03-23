const handleNewClient = require("./connection");
const handleCoordinates = require("./coordinates");

// Object of all active projects
const socket = (io, projects) => {
  io.on("connection", (socket) => {
    console.log("Made socket connection");

    socket.on("new client", (data) => handleNewClient(data, socket, projects));
    socket.on("coordinates", (data) => handleCoordinates(data, projects));
    socket.on("voice", (_data) => console.log("TODO"));
  });

  // Send all project data to every client on every 5 seconds
  setInterval(() => {
    console.log("Emitting: ", projects);
    io.emit(JSON.stringify(projects));
    handleEmitToServers(projects);
  }, 5000);
};

const handleEmitToServers = (projects) => {
  for (const roomId in projects) {
    const project = projects[roomId] ?? {};
    if (project?.serverEndpoint) {
      project?.serverEndpoint?.emit("sync", JSON.stringify(projects));
    }
  }
};

module.exports = socket;
