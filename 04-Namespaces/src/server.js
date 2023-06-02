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

const namespace1 = io.of('/custom-namespace');

namespace1.on('connection', (socket) => {
      console.log('Socket is running'.rainbow);
      namespace1.emit('custom-event', 'from server side');
      socket.on('disconnect', () => {
            console.log('Socket is disconnected'.bold.underline.red);
      })
})

http.listen(3000, () => { 
      console.log('Server is running on 3000'.bold.underline.blue);
})