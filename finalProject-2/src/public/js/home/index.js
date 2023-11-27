const goToChat = document.getElementById('goChat')
const url = 'http://localhost:8080/chat'

goToChat.addEventListener('click', function() {
    window.location.href = url
})
