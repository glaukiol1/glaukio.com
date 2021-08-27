

const commands = { // commands
    'help': 'VSH is a terminal emulator that I coded, to help you learn about me. Im currently updating this site as much as I can, so new commands will be added. <br><br>Use up and down arrow keys to browse command history (unless it\'s empty).<br><br>And most importantly -- have fun! <br><br>Available Commands: <br><br>     <span class="vsh-text vsh-green">whoami  </span> -- A bit about me ',
    'whoami': 'Im a programmer, always looking to learn new things, currently, im learning Java on Udemy.com.'

}







var commandMemory = [];
var currentData = '';
var textArea = document.getElementById('textarea');
var cmdArea = document.getElementById('cmd-area');

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
            textArea.innerHTML = `❯ ${currentData}█`
        }
    } else if (action === 'back') {
        currentData = currentData.slice(0,currentData.length-1);
        textArea.innerHTML = `❯ ${currentData}█`
    } else if (action === 'run') {
        cmdBackCount = 1;
        commandMemory.push(currentData);
        textArea.innerHTML = `❯ ${currentData}`
        callCommand(currentData);
    } else if (action === 'last-cmd') {
        currentData = commandMemory[commandMemory.length-cmdBackCount] ? commandMemory[commandMemory.length-cmdBackCount] : '';
        textArea.innerHTML = `❯ ${currentData}█`
        cmdBackCount+=1;
    }
}


const newTextarea = () => {
    var h = document.getElementsByClassName('vsh-textarea')[0];
    var j = document.createElement('span');
    h.innerHTML += '<br /><span class="vsh-text vsh-yellow">guest</span> at <span class="vsh-text vsh-magenta">glaukiol1</span><br>';
    j.innerHTML = '❯ █'
    return h.appendChild(j);
}

const newCmdArea = () => {
    var h = document.getElementsByClassName('vsh-textarea')[0];
    var j = document.createElement('span');
    h.innerHTML += '<br />';
    return h.appendChild(j);
}

const commandCleanup = () => {
    textArea = newTextarea();
    currentData = '';
}

const getCommandOutput = (command) => {
    if (command === "help") {
        return commands.help;
    } else if (command === 'whoami') {
        return commands.whoami;
    } else{
        return `Unknown command: <span class="vsh-text vsh-magenta">${command}</span>`;
    }
}

const callCommand = (command) => {
    
    cmdArea = newCmdArea();
    cmdArea.innerHTML += getCommandOutput(command) + '<br>';
    commandCleanup();
    var h = document.getElementsByClassName('vsh-textarea')[0];
    h.scrollTop = h.scrollHeight;
}

document.addEventListener('keydown', (e) => {
    keypress(e.key, getAction(e.key))
})