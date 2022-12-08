import React, { useContext, useEffect, useState } from "react";
import SocketContext from "../Context/SocketContext";

const Chat = () => {
  const { username, socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() && username) {
      socket.emit("message", {
        text: e.target[0].value,
        name: username,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      e.target.reset();
    }
  };

  useEffect(() => {
    socket.on("all-messages", (messages) => {
      setMessages(messages);
    });
    socket.on("received-message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, socket]);

  useEffect(() => {
    socket.emit("get-all-messages");
  }, []);

  return (
    <div className="w-4/5">
      <div className="w-full bg-yellow-50 h-[800px] p-5 overflow-y-auto">
        {messages.map((message) => (
          <div
            className={`${
              username === message.name
                ? "text-right mr-0 ml-auto bg-yellow-500 text-black"
                : "text-left mr-auto ml-0 bg-black text-yellow-500"
            } rounded-md  font-bold w-max mt-3 py-2 px-5`}
            key={message.id}
          >
            <span
              className={`${
                username === message.name
                  ? "text-slate-700 text-sm"
                  : "text-slate-400 text-sm"
              }`}
            >
              {message.name}
            </span>
            <p className="">{message.text}</p>
            <span
              className={`${
                username === message.name
                  ? "text-slate-700 text-sm"
                  : "text-slate-400 text-sm"
              }`}
            >
              {new Date(message.date).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSendMessage}
          className="mt-8 flex gap-4"
          method="POST"
        >
          <textarea className="w-[90%] h-20 p-4 outline-none bg-yellow-50 font-bold" />
          <button className="w-[10%] bg-yellow-400 font-bold text-2xl">
            Poslať
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
