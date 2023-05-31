const app = require('express')();
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)
require('colors');


app.get('/',(req,res) => {
      const options = {
            root : path.join(__dirname)
      }
      const fileName = 'index.html'
      return res.sendFile(fileName, options)
})

io.on('connection', (socket) => {
      console.log('socket is connected'.rainbow);

      socket.on('disconnect', () => {
            console.log('socket is disconnected'.underline.red);
      })
})


http.listen(3000, () => {
      console.log('Server is running on 3000'.bold.blue);
})