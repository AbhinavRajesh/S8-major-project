// TODO: Create voice channel
// Ref: https://dev.to/hosseinmobarakian/create-simple-voice-chat-app-with-nodejs-1b70

const handleVoiceChannel = (data, io, socket, connections) => {
  let newData = data.split(";");
  newData = `data:audio/ogg;${newData[1]}`;

  socket.broadcast.emit("voice", newData);
};

module.exports = handleVoiceChannel;
