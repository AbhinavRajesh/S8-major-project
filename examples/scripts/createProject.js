const { io } = require("socket.io-client");

const roomId = "test";
const serverEndpoint = null;

(() => {
  console.log("STARTING Fn.");
  const client = io(
    "https://abhinavrajesh-orange-space-waffle-rw5rg5456qfxgj6-8000.preview.app.github.dev"
  );
  console.log("Connection Created");
  const projectDetails = {
    roomId,
    serverEndpoint,
  };
  console.log("Emitting ", projectDetails);
  client.emit("new client", JSON.stringify(projectDetails));
  console.log("Emitted");
})();
