const handleNewClient = (serverSocket, connections) => {
  connections.clients[serverSocket.id] = [0, 0, 0];
};

module.exports = handleNewClient;
