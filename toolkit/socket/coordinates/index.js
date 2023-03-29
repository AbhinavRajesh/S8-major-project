const handleCoordinates = (data, connections, clientId) => {
  const jsonData = JSON.parse(data);
  const { position, rotation } = jsonData;

  connections.clients[clientId] = {
    position,
    rotation
  };
};

module.exports = handleCoordinates;
