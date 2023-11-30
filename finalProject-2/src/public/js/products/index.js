const goToChat = document.getElementById('goChat')
const urlChat = 'http://localhost:8080/chat'
const limitNow = document.getElementById('limit').value
const checkbox = document.getElementById('checkboxDisp')
let query = ''
let limitValue = limitNow

document.querySelector('#btnLimit').onclick = () => {
    limitValue = document.querySelector('#limit').value
    redirectToURL(limitValue, 1)    
}

function redirectToURL(limit,page,inStock) {
    const url = `/products?limit=${limit}&page=${page}&query=${query}&stock=${inStock}`
    document.location.href = url
}

goToChat.addEventListener('click', function() {
    window.location.href = urlChat
})

document.querySelector('#btnPrev').onclick = () => {
    const prevPage = document.querySelector('#prevPage').value
    redirectToURL(limitValue,prevPage,false)
}

document.querySelector('#btnNext').onclick = () => {
    const nextPage = document.querySelector('#nextPage').value
    redirectToURL(limitValue,nextPage,false)
}

document.querySelector('#btnSearchQuery').onclick = () => {
    query = document.querySelector('#searchQuery').value
    redirectToURL(limitValue,1,false)
}

document.querySelector('#clearLimit').onclick = () => {
    redirectToURL(10,1,false)
}

document.querySelector('#clearQuery').onclick = () => {
    document.querySelector('#searchQuery').value = ''
    redirectToURL(10,1,false)
}

checkbox.addEventListener('change', function() {
    inStock = this.checked 
    redirectToURL(limitValue,1,inStock)   
})



