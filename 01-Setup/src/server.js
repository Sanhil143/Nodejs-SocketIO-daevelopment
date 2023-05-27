const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');


app.get('/', (req,res) => {
      var options = {
            root: path.join(__dirname)
      }

      var fileName = 'index.html';
      res.sendFile(fileName,options)
})

io.on('connection', (socket) => {
      console.log("Socket is connected");

      socket.on('disconnect', () => {
            console.log('Socket is disconnected');
      })
})

server.listen(3000,() => {
      console.log('server is running on port 3000');
})





