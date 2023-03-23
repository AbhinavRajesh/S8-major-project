const { io } = require("socket.io-client");

const handleNewClient = (data, server, projects) => {
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  const { roomId, serverEndpoint } = jsonData;
  const client = serverEndpoint ? io(serverEndpoint) : null;
  projects[roomId] = {
    connectedClients: {},
    voiceRoomId: "TODO",
    serverEndpoint: client,
  };

  if (serverEndpoint) {
    io.on("connect", () => {
      console.log("Connected to server of the project");
    });

    io.on("data", (data) => {
      server.emit("server sent", data);
    });
  }
};

module.exports = handleNewClient;
