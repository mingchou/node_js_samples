
console.log('connect to server');
var user_name = document.getElementById('username');
var input_text = document.getElementById('userinput');
var display_text = document.getElementById('display');
var username = '';
var socket = io.connect();


function addChatMessage(msg) {
    display_text.innerHTML += '<br>' + msg;
}

socket.on('add user', function(user){
    console.log(user.username + 'joined');
    addChatMessage(user.username + ' joined chat room');
});

socket.on('new message', function(data){
    addChatMessage(data.message);
});

function handleKeyDown(event) {
    console.log('event ' + event.which + ' pressed');
    if (event.which == 13) {
        if (username != '') {
            console.log('111');
            var msg = input_text.value;
            socket.emit('send message to server', {message: msg});
            console.log('send ' + msg);
            input_text.value = '';
        }
        else {
            console.log('222');
            username = user_name.value;
            console.log(username + ' login');
            socket.emit('login', {username: username});
        }
    }
}

document.addEventListener("keydown", handleKeyDown, false);