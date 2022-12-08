const express = require("express");
const app = express();
const PORT = 4000;

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const fs = require("fs");
const messages = JSON.parse(
  fs.readFileSync("messages.json", { encoding: "utf8" }) || ""
);
function saveToFIle(jsonContent) {
  fs.writeFile("messages.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("get-all-messages", () => {
    socketIO.emit("all-messages", messages);
  });

  socket.on("message", (data) => {
    const dataWithDate = { ...data, date: new Date() };
    messages.push(dataWithDate);
    saveToFIle(JSON.stringify(messages));
    console.log(messages);
    socketIO.emit("received-message", dataWithDate);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
