const handleCoordinates = (data, projects) => {
  const { roomId, clientId, coordinates } = data;

  projects[roomId] = {
    connectedClient: {
      [clientId]: {
        ...projects[roomId].connectedClient[clientId],
        coordinates,
      },
    },
  };
};

module.exports = handleCoordinates;
