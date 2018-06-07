const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-378258387511-378102244902-iiS3akq0BaEu6af0Ukjty1Xf',
    name: 'jokebot'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general', 'Get ready to laugh your socks off!', params);
});

//error handler
bot.on('error', (err) => console.log(err));

//message handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    };

    handleMessage(data.text);
});

// Respond to data
function handleMessage(message) {
    if (message.includes(' chucknorris')) {
        chuckJoke();
    } else if (message.includes(' yomomma')) {
        yoMommajoke();
    } else if (message.includes(' random')) {
        randomJoke();
    } else if (message.includes(' help')) {
        runHelp();
    }
}

// Tell a Chuck Norris joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            };

            bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
        });
}

// Tell a Yo Momma joke
function yoMommajoke() {
    axios.get('http://api.yomomma.info')
        .then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji: ':laughing:'
            };

            bot.postMessageToChannel('general', `Yo Momma: ${joke}`, params);
        });
};

// Tell a random joke
function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1) {
        chuckJoke();
    } else if (rand === 2) {
        yoMommajoke();
    }
}

// Show help text
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomomma', or 'random' to get a joke`, params);
}