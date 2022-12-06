import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import SocketContext from "../SocketContext";

const SocketProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [socket, setSocket] = useState(null);

  const handleSubmitUsername = (event) => {
    event.preventDefault();
    setUsername(event.target[0].value);
  };

  useEffect(() => {
    const socHelp = socketIO.connect("http://localhost:4000");
    socHelp.on("connect", () => setSocket(socHelp));
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket,
        username: username,
        handleSubmitUsername: handleSubmitUsername,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
