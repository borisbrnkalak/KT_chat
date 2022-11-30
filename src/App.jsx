import "./App.css";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  return <div className="App h-screen bg-yellow-500"></div>;
}

export default App;
