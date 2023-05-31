const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
require('colors')

app.get('/', (req,res) => {
      const option = {
            root: path.join(__dirname)
      }
      const fileName = 'index.html'
      return res.sendFile(fileName,option)
})

io.on('connection', (socket) => {
      console.log('Socket is connected'.rainbow);

      setTimeout(() => {
            // send means --Message-- that is prereserved events 
            socket.send('message from server side by prereserved event');
      },3000)

      socket.on('disconnect', () => {
            console.log('Socket is disconnected'.bold.underline.red);
      })
})

http.listen(3000, () => {
      console.log('Server is running on 3000'.bold.underline.blue);
})