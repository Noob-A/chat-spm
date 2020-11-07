const spapi = require('spapi.js').SPm; //SPm - сервер #СПм.
const Discord = require('discord.js');
const robot = require('robotjs');
const cleverbot = require("cleverbot-free");
const client = new Discord.Client();
let channelList = []
let lastMessage = []
let withAlice = []

function arrayRemove(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

client.on('ready', () => {
    client.user.setActivity(".help | Список команд");
    setInterval(() => {
        spapi.getLastChatMessages(50).then(messages => {
            if (isInArray(messages[messages.length-1].text, lastMessage)) {
                return;
            }
            for (const ch of channelList){
                console.log(channelList)

                let channel = client.channels.cache.get(ch)

                
                try {
                    console.log(messages[messages.length-1].sender.nickname+':'+messages[messages.length-1].text + '            ' + lastMessage[messages.length-1].sender.nickname+':'+lastMessage[messages.length-1].text)
                } catch (error){console.log('[СПм] ' +messages[messages.length-1].sender.nickname+ ':' + ' ' + messages[messages.length-1].text)}
                try {
                    channel.send('[**СПм**] ' + "`"+(messages[messages.length - 1].sender.nickname)+"`" + ':' + ' ' + messages[messages.length - 1].text)
                } catch (error){}

                lastMessage.push(messages[messages.length-1].text)
                if (isInArray(ch, withAlice)){
                    console.log('A: '+withAlice)
                    try {
                        cleverbot(messages[messages.length-1].text).then(response => channel.send('[**Bot**] ' + "НедоАлиса" + ':' + ' ' + response));
                    }catch (e) {}
                }
                //cleverbot(messages[messages.length-1].text).then(response => write_chat('!'+'[Bot] ' + "НедоАлиса" + ':' + ' ' + response));
            }

        }).catch(err => console.error(err));}, 3000);

});
client.on('message', message => {
    if (message.content === '.setup'){
        if (!channelList.includes(message.channel.id)) {
            channelList.push(message.channel.id)
            message.channel.send('Бот успешно настроен! Чтобы отключить меня от этого канала напиши .leave в этот же канал.')
        }
        message.channel.send("Вы не можете использовать команду .setup в одном и том же канале!")
    }
    if (message.content === '.leave') {
        if (channelList.includes(message.channel.id)) {
            arrayRemove(channelList, message.channel.id)
            message.channel.send('Бот успешно отключён от канала! Чтобы вернуть меня напиши .setup любой другой канал.')
        }
        message.channel.send("Вы не можете использовать эту команду пока не пропишите .setup !")
    }
    if (message.content === '.help') {
        message.channel.send('Подключить чат в канал где исполнена команда:\n' +
            '> **.setup**\n' +
            'Отключить из чата:\n' +
            '> **.leave**\n' +
            'Добавить алису в чат(ВНИМАНИЕ, МОЖЕТ БЫТЬ ТОКСИЧНОЙ):\n' +
            '> **.alice on**\n' +
            'Убрать алису из чата:\n' +
            '> **.alice off**\n')
    }
    if (message.content === '.alice on') {
        withAlice.push(message.channel.id)
    }
    if (message.content === '.alice off') {
        arrayRemove(withAlice,message.channel.id)
    }

});
/*
> [СПм] antmaster0p25: С вас ары с меня алмазы курс 1 ар-4 алмаза
773459179116429312 оооо +бан, ары тут покупает
*/
client.login('лол');