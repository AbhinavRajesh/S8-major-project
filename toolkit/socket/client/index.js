const handleNewClient = (serverSocket, connections) => {
  //  assigning admin
  if (Object.keys(connections.clients).length === 1)
    connections.admin = serverSocket.id;

  connections.clients[serverSocket.id] = [0, 0, 0];
};

const handleDeleteClient = (connections, socket) => {
  console.log("[DELETING]: ", socket.id);
  delete connections.clients[socket.id];

  // finding new admin if current admin left
  if (socket.id === connections.admin) {
    let adminId = "";
    if (Object.keys(connections.clients).length >= 1)
      adminId = Object.keys(connections.clients)[1];
    connections.admin = "";
  }
};

module.exports = { handleNewClient, handleDeleteClient };
