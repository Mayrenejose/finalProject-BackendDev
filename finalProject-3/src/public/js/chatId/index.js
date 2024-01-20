const socket = io()
const containerText = document.querySelector('#message')

socket.on('chat_ecommerce', (messageNew) => { 
    containerText.innerHTML = ''
    const name = messageNew.email
    messageNew.message.forEach( msj => {
        containerText.innerHTML += `<p>${name}: ${msj}</p>`
    }) 
});

document.querySelector('#sendMessage').onclick = () => {
    const newMessage = document.querySelector('#messageId').value
    const userId = document.querySelector('#idUser').value
    const url = 'http://localhost:8080/chat'

    if (newMessage !== '') {
        fetch(`${url}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: newMessage })
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }

    document.querySelector('#messageId').value = ''
}