import { useEffect } from "react";
import { socket } from "./utils/socket"

const AudioChannel = () => {

    useEffect(() => {
        handleVoiceChannel()
    }, [])

    const handleVoiceChannel = () => {
        if (navigator && navigator.mediaDevices) {
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
  
                let audioChunks: any[] = [];
  
                mediaRecorder.addEventListener("dataavailable", (e) => {
                  audioChunks.push(e.data);
                });
  
                mediaRecorder.addEventListener("stop", () => {
                  const audioBlob = new Blob(audioChunks);
                  audioChunks = [];
                  const fileReader = new FileReader();
                  fileReader.readAsDataURL(audioBlob);
                  fileReader.onloadend = () => {
                    const base64String = fileReader.result;
                    socket.emit("voice", base64String);
                  };
  
                  mediaRecorder.start();
  
                  setTimeout(() => {
                    mediaRecorder.stop();
                  }, 750);
                });
  
                setTimeout(() => {
                  mediaRecorder.stop();
                }, 750);
              });
  
            socket.on("voice", (data) => {
              const audio = new Audio(data);
              audio.play();
            });
          }
    }
    
    return null;
}

export default AudioChannel;