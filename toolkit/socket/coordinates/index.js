const handleCoordinates = (data, connections, clientId) => {
  const jsonData = JSON.parse(data);
  const { coordinates } = jsonData;

  connections.clients[clientId] = coordinates;
};

module.exports = handleCoordinates;
