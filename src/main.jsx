import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SocketProvider from "./Context/Providers/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
