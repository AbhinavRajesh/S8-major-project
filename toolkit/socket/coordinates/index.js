const handleCoordinates = (data, connections, clientId) => {
  const jsonData = JSON.parse(data);
  const { position } = jsonData;

  connections.clients[clientId] = position;
};

module.exports = handleCoordinates;
