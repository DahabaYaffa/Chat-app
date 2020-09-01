// const { users, channels } = require('../config.json')

const commandes = [
    {
        name:"nickname",
        command: '/nick',
        function: 'changeNickname',
        type: 'user',
        param: 1
    },
    {
        name:"list",
        command: '/list',
        function:'listChannels',
    },
    {
        name:'create',
        command: '/create',
        function: 'createChannel',
    },
    {
        name: 'delete',
        command: '/delete',
        function: 'deleteChannel',
    },
    {
        name: 'join',
        command: '/join',
        function: 'joinChannel',
        
    },
    {
        name: 'part',
        command: '/part',
        function: 'leaveChannel',
        
    },
    {
        name: 'users',
        command: '/users',
        function: 'listUsers',
    },
    {
        name: 'message',
        command: '/msg',
        function: 'messageNickname',
        type: 'user',
        param: 1
    }
]

const hasCommand = (message) => {
    let messageArray = message.split(' ')

    let findCommand = commandes.find(command => command.command === messageArray[0])
    console.log(messageArray[0]);
    console.log(message);
    if (typeof findCommand !== 'undefined') {
        return {function: findCommand.function, params: messageArray, name: findCommand.name}
    }

    return false
}


module.exports = { hasCommand }
