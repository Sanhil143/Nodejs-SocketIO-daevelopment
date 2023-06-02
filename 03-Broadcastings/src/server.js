const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')
require('colors')

app.get('/', (req, res) => {
      const option = {
            root: path.join(__dirname)
      }
      const fileName = 'index.html';
      return res.sendFile(fileName, option);
})
var user = 0;

io.on('connection', (socket) => {
      console.log('Socket is connected'.rainbow);
      user++;

      //check how many user connected
      // io.sockets.emit('broadcast', {message: user + 'users connected'})

      //welcome message on new joined user  custom event
      socket.emit('newUserConnect', { message: 'hello, welcome dear!' })

      // only shows already connected user
      socket.broadcast.emit('newUserConnect', { message: user + 'users connected' })


      socket.on('disconnect', () => {
            console.log('Socket is disconnected'.bold.underline.red);
            user--;

            //check how many user connected
            // io.sockets.emit('broadcast', {message: user + 'users connected'})

      // only shows already connected user

            socket.broadcast.emit('newUserConnect', { message: user + 'users connected' })

      })
})

http.listen(3000, () => {
      console.log('Server is running on 3000'.bold.underline.blue);
})