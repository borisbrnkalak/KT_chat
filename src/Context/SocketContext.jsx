import React from "react";

const SocketContext = React.createContext({
  socket: null,
  username: null,
  setUsername: () => {},
});

export default SocketContext;
