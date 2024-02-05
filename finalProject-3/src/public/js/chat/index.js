const btnSendMessage = document.querySelector('#btnSendEmail')
const url = 'http://localhost:8080/chat'
const messageError = 'Unregistered user'

const addNewUser = (email) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        const ubication = document.URL
        window.location = `${ubication}/${data.data._id}`
    })
    .catch(error => {
        console.error('error:', error)
    })
} 

document.querySelector('#btnSendEmail').onclick = () => {
    const email = document.querySelector('#inputEmail').value

    fetch(`${url}/users/${email}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        
        if ( data.message === messageError ) {
            addNewUser(email)
        } else {
            const ubication = document.URL
            window.location = `${ubication}/${data.data._id}`
        }
    })
}