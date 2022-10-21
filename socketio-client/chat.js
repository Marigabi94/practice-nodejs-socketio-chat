const socket =io();

// DOM elements
let output    = document.getElementById('chat-output');
let actions   = document.getElementById('chat-actions');
let username  = document.getElementById('username');
let message   = document.getElementById('message');
let send      = document.getElementById('send');

send.addEventListener('click', ()=>{
    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    });
    username.disabled = true;
    message.value= '';
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data){
    actions.innerHTML= '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p>
        <em>${data}</em>: is typing a message
    </p>`
});