import React, { useContext } from "react";
import "./App.css";
import Chat from "./components/Chat";
import FormUser from "./components/FormUser";
import SocketContext from "./Context/SocketContext";

function App() {
  const { username } = useContext(SocketContext);
  return (
    <div className="bg-slate-200 min-h-screen w-full flex items-center justify-center p-4">
      {username === null ? <FormUser /> : <Chat />}
    </div>
  );
}

export default App;
