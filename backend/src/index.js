const express= require('express');


const dotenv= require('dotenv');
const mongoose= require('mongoose');

const {Server}= require('socket.io')

const c= express();

const app= require('./app');
dotenv.config();

mongoose.connect(process.env.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log('mongoose connected')
})

// c.get('/', (req,res)=>{
//   res.json({message: "success"})
// })
const server=app.listen("8000", ()=>{
    console.log('listening on 8000');
})


const io = new Server(server,{
   cors:{
     origin:true,
     credentials: true
   }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients (excluding the sender)
    console.log(message);
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});







