const socketClient = io();

let user
const chatbox = document.getElementById("chatBox");
const chat = document.getElementById("chat");


Swal.fire({
    title: "Indentificate",
    input: "text",
    text: "Escribi tu nombre",
    inputValidator: (value) =>{
        return !value && "Necesitas indentificarte con un nombre"
    },
    allowOutsideClick: false
})
.then((result)=>{
    user = result.value;
    socketClient.emit("authenticated",`usuario ${user} ha iniciado sesión`)
});



chatbox.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        if(chatbox.value.trim().length > 0){
            socketClient.emit("message",{user:user,message:chatbox.value});
            chatbox.value="";
        }
    }
});



socketClient.on("messageHistory", (dataServer)=>{
    let messageElmts = "";
    dataServer.forEach(item=>{
        messageElmts = messageElmts + `<p><span>${item.user}</span>: ${item.message}</p>`
    });

    chat.innerHTML = messageElmts;
});


socketClient.on("newUser", (data)=>{
    if(user){
        Swal.fire({
            text:data,
            toast:true,
            position:"top-right"
        });
    }
});


socketClient.emit("deleteMessage", (message))