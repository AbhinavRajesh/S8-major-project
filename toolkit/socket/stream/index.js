const handleStream = (data, connections, clientId) => {
  const jsonData = JSON.parse(data);
  const { seekTime } = jsonData;

  //   update only if the client is admin
  if (connections.admin === clientId) connections.seekTime = seekTime;
};

module.exports = handleStream;
