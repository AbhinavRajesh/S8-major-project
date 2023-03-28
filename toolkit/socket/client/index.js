const handleNewClient = (serverSocket, connections) => {
  connections.clients[serverSocket.id] = [0, 0, 0];

  //  assigning admin
  if (Object.keys(connections.clients).length === 1)
    connections.admin = serverSocket.id;
};

const handleDeleteClient = (connections, clientId) => {
  console.log("[DELETING]: ", clientId);
  delete connections.clients[clientId];

  // finding new admin if current admin left
  if (clientId === connections.admin) {
    let adminId = "";
    if (Object.keys(connections.clients).length >= 1)
      adminId = Object.keys(connections.clients)[0];
    connections.admin = "";
  }
};

module.exports = { handleNewClient, handleDeleteClient };
