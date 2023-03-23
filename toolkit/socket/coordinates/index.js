const handleCoordinates = (data, connections) => {
  const jsonData = JSON.parse(data);
  const { clientId, coordinates } = jsonData;

  connections.clients[clientId] = coordinates;
};

module.exports = handleCoordinates;
