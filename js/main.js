var commandMemory = [];
var currentData = '';

const acceptedChars = [" ", ".", ",", "(", ")", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

// get what action the user is tring to accomplish by pressing this key
const getAction = (key) => {
    switch (key) {
        case 'Backspace':
            return 'back'
        case 'Enter':
            return 'run'
        case 'ArrowUp':
            return 'last-cmd'
        default:
            return 'cmd'
    }
}

var cmdBackCount = 1;

const keypress = (key, action) => {
    console.log(key)
    if (action === 'cmd') {
        if (acceptedChars.indexOf(key) !== -1) {
            currentData+=key;
            document.getElementById('textarea').innerHTML = `❯ ${currentData}█`
        }
    } else if (action === 'back') {
        currentData = currentData.slice(0,currentData.length-1);
        document.getElementById('textarea').innerHTML = `❯ ${currentData}█`
    } else if (action === 'run') {
        cmdBackCount = 1;
        commandMemory.push(currentData);
        callCommand(currentData)
    } else if (action === 'last-cmd') {
        currentData = commandMemory[commandMemory.length-cmdBackCount] ? commandMemory[commandMemory.length-cmdBackCount] : '';
        document.getElementById('textarea').innerHTML = `❯ ${currentData}█`
        cmdBackCount+=1;
    }
}

const clearTextArea = () => {
    currentData = '';
    document.getElementById('textarea').innerHTML = `❯ ${currentData}█`
}

const getCommandOutput = (command) => {
    if (command === "help") {
        return 'Help will come your way!'
    } else {
        return 'Invalid Command!'
    }
}

const callCommand = (command) => {
    document.getElementById('cmd-area').innerHTML += getCommandOutput(command) + '<br>';
    clearTextArea();
}

document.addEventListener('keydown', (e) => {
    keypress(e.key, getAction(e.key))
})