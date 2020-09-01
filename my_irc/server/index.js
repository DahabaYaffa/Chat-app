const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const  hasCommand  = require('./commandes.js').hasCommand;
const {addUser, removeUser, getUser,getUserByName, getUsersInRoom, changeNickname, listUsers, returnUser} = require('./users.js');

const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({ id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name}, Bienvenue dans la room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name} a rejoint la room!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user,room, users: getUsersInRoom(user,room)})
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        console.log(message);
        const user= getUser(socket.id);
        const oldNickName = user.name;
        const oldChannel = user.room;
        let command = hasCommand(message);
        let data;

        if(!command){
        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.name, users: getUsersInRoom(user.room)});
        }else{
            switch (command.name){
                case 'nickname':
                    if(typeof command.params[1] !== 'undefined'){
                        let newNickName = changeNickname(command.params, user.name)
                        data = {for: 'newNickName', data: newNickName}
                        io.to(user.room).emit('message', {user: '', text:`${oldNickName} vient de changer son pseudo en ${newNickName}!`})
                        callback(data)
                    }
                    break;
                
                case 'users':
                    let users = listUsers();
                    let userList = returnUser(users, oldChannel)

                    io.to(user.id).emit('message', {
                        user: '',
                        text: userList
                    });
                    break;
                    
            }
        }
    
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user:'admin', text: `${user.name} a quitté la room.`})
            
        }
    });

});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));