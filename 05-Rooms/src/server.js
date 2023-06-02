const app = require('express')();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
require('colors');

app.get('/', (req,res) => {
      const option = {
            root : path.join(__dirname)
      }
      const fileName = 'index.html';
      return res.sendFile(fileName,option);
})
let roomno = 1;
let full = 0;

io.on('connection', (socket) => {
      console.log('Socket is running'.rainbow);

      socket.join('room' +roomno);

      io.sockets.in('room'+roomno).emit('connectedRoom', 'You are connected to room no. '+roomno);

      full++;
      if(full >= 2){
            full = 0;
            roomno++;
      }


      socket.on('disconnect', () => {
            console.log('Socket is disconnected'.bold.underline.red);
      })
})



http.listen(3000, () => {
      console.log('Server is running on 3000'.bold.underline.blue);
})