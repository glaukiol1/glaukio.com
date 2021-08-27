

const commands = { // commands
    'help': 'VSH is a terminal emulator that I coded, to help you learn about me. Im currently updating this site as much as I can, so new commands will be added. <br><br>Use up and down arrow keys to browse command history (unless it\'s empty).<br><br>And most importantly -- have fun! <br><br>Available Commands: <br><br>     <span class="vsh-text vsh-green">whoami  </span> -- A bit about me<br>     <span class="vsh-text vsh-green">touch     </span> -- Ways to get in touch with me<br>     <span class="vsh-text vsh-green">learning </span> -- My learning achievements in programming<br>     <span class="vsh-text vsh-green">top </span>          -- My top programming languages ',
    'whoami': 'Im a programmer, always looking to learn new things, currently, im learning Java on Udemy.com.',
    'touch': 'Ways to get in touch:<br><br>     Email: <a href="mailto:glaukiol1@gmail.com">glaukiol1@gmail.com</a><br>     GitHub: <a href="https://github.com/glaukiol1">https://github.com/glaukiol1</a>',
    'learning': 'These are my achievements for programming; <br><br>    Udemy Build a Blockchain in JS | Full Stack (<a href="https://www.udemy.com/certificate/UC-0b988b8d-e5c8-4b91-91ab-7fbb561cb1ea/">Certificate</a>)<br>    Udemy Java Masterclass (In Progress, <a href="https://www.udemy.com/course/java-the-complete-java-developer-course/">course</a>)<br>    Udemy Android Development in Kotlin Masterclass (In Progress, <a href="https://www.udemy.com/course/android-oreo-kotlin-app-masterclass">course</a>)<br>    TeamTreeHouse Full-Stack JavaScript 44 Hours (<a href="https://teamtreehouse.com/tracks/full-stack-javascript">Track/Course</a>)<br>    TeamTreeHouse 11,000 Points in JavaScript',
    'top': 'JavaScript         [<span class="vsh-text vsh-green"> | | | | | | | | | | | | </span><span class="vsh-text vsh-yellow">| | | | | </span><span class="vsh-text vsh-magenta">| | |</span> ]<br>Node.JS             [<span class="vsh-text vsh-green"> | | | | | | | | | | | | </span><span class="vsh-text vsh-yellow">| | | | | </span><span class="vsh-text vsh-magenta">| |</span>   ]<br>Python               [<span class="vsh-text vsh-green"> | | | | | | | | | | | | </span><span class="vsh-text vsh-yellow">| | | | | </span><span class="vsh-text vsh-magenta">| </span>    ]<br>Java                   [<span class="vsh-text vsh-green"> | | | | | | | | | | | | </span><span class="vsh-text vsh-yellow">| | | |</span>         ]<br>C++                    [<span class="vsh-text vsh-green"> | | | | | | | | | | | | </span><span class="vsh-text vsh-yellow">| </span>              ]<br>C                        [<span class="vsh-text vsh-green"> | | | | | | | | | | | | </span>                ]'

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
    h.innerHTML += '<br /><span class="vsh-text vsh-yellow">💻 guest</span>@<span class="vsh-text vsh-magenta">glaukiol1</span><br>';
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
    } else if (command === "touch") {
        return commands.touch;
    } else if (command === "learning") {
        return commands.learning;
    } else if (command === "top") {
        return commands.top;
    } else {
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