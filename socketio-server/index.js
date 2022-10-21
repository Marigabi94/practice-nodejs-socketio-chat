const path = require('path');
const express = require('express');
const { Socket } = require('socket.io');
const app     = express();

//+ Server
    //+ Settings
        app.set('port', process.env.PORT || 3000);
    
    //+ Static File
        app.use(express.static(path.join(__dirname, '../socketio-client')));
    
    //+ Start The Server
        const server = app.listen(app.get('port'), ()=>{
            console.log('server on port', app.get('port'));
        })
// [END] Server




//+ Websockets
    //+ Config SocketIO
        const SocketIO = require('socket.io');
        const io = SocketIO(server); //Init server in socket.io
    // [END] Config SocketIO
    
    //+ Actions 
        io.on('connection', (socket)=>{
            console.log('new connection', socket.id);
            
            socket.on('chat:message',(data)=>{
                io.sockets.emit('chat:message', data);
            });

            socket.on('chat:typing', (data)=>{
                socket.broadcast.emit('chat:typing', data); //Emitir exepto a uno mismo.
            });
        });
// [END] Websockets

