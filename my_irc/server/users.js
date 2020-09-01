const users = [];

const addUser = ({id, name, room}) => {
    //Dahaba Yaffa = dahabayaffa
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();1

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return {error : 'Le pseudo es déjà pris!'}
    }

    const user = {id, name, room};

    users.push(user);

    return {user}

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id );

const getUserByName = (name) => {
    let findUser = users.findIndex(user => user.name === name);
    if(findUser !== -1){
        return users[findUser]
    }
    return false;
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const changeNickname = (params, username) => { 
    let findName = users.findIndex(user => user.name === params[1])
    let findUser = users.findIndex(user => user.name === username)

    if (findName === -1) {
        users[findUser].name = params[1]
        return users[findUser].name
    }

    return false
};

const listUsers = () => {
    return users;
}

const returnUser = (users, channel) => {
        let userList = 'Utilisateurs connectés à la room: ';

    users.forEach((user) => {
        if (user.room === channel){
            userList += user.name + ", ";
        }
    });
        userList = userList.slice(0, -2);
        userList += '.';

    return userList;
}

module.exports = {addUser, removeUser, getUser,getUserByName, getUsersInRoom, changeNickname, listUsers, returnUser};