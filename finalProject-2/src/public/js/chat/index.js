const socket = io()
const url = 'http://localhost:8080/chat'
const errorMsg = 'server error' 
const listProducts = document.querySelector('#boxProducts')
const mainChat = document.querySelector('#chatMain')
const btnSendMessage = document.querySelector('#sendMessage')

const labelInput = document.createElement('p')
labelInput.textContent = 'Ingresa tu Email:'
labelInput.className = 'labelCls'
const inputDiv = document.createElement('input')
inputDiv.placeholder = 'email'
inputDiv.className = 'inputCls'
inputDiv.id = 'inputEmail'
const btnInput = document.createElement('button')
btnInput.className = 'btnChat'
btnInput.textContent = 'enviar'
btnInput.id = 'btnSendEmail'

listProducts.appendChild(labelInput)
listProducts.appendChild(inputDiv)
listProducts.appendChild(btnInput)

function createTextArea () {
    const boxMessages = document.createElement('div')
    boxMessages.className = 'boxMessages'
    const chatDiv = document.createElement('div')
    chatDiv.className = 'mainChat'
    const textAreaChat = document.createElement('textarea')
    textAreaChat.className = 'textareaCls'
    textAreaChat.id = 'messageId'
    const btnTextarea = document.createElement('button')
    btnTextarea.className = 'btnChat'
    btnTextarea.textContent = 'enviar'
    btnTextarea.id = 'sendMessage'

    boxMessages.appendChild(chatDiv)
    chatDiv.appendChild(textAreaChat)
    chatDiv.appendChild(btnTextarea)
    btnSendMessage.appendChild(boxMessages)

    return boxMessages
}

function messajeTex(message) {
    const writeMessages = document.createElement('p')
    writeMessages.textContent = message

    return writeMessages
}

document.querySelector('#btnSendEmail').onclick = () => {
    const email = document.querySelector('#inputEmail').value
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if ( data.message === errorMsg ) {
            //aqui deberias llamar el registro de mensajes que tiene el usuario
            //tambien llama a la caja
            mainChat.innerHTML = ''
            const openWindowChat = createTextArea()
            mainChat.appendChild(openWindowChat)
        } else {
            mainChat.innerHTML = ''
            const openWindowChat = createTextArea()
            mainChat.appendChild(openWindowChat)
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    })
}

socket.on('chat_ecommerce', (user) => {
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'sendMessage') {
            const message = document.querySelector('#messageId').value
            const id = user._id
            fetch(`http://localhost:8080/chat/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })
            .then(response => response.json())
            .then(data => {

            btnSendMessage.innerHTML=''
                data.message.forEach( item => {
                    console.log('escriyo');
                    const prueba =  messajeTex(item)
                    btnSendMessage.appendChild(prueba)
                })
            })
        }
    })
})