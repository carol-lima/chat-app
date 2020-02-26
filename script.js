const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('form-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Qual é o seu nome?')
appendMessage('Você entrou!')
socket.emit('new-user', name)

socket.on('chat-message', data => {
	appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
	appendMessage(`${name} entrou`)
})

socket.on('user-disconnected', name => {
	appendMessage(`${name} saiu`)
})

messageForm.addEventListener('submit', e => {
	e.preventDefault()
	const message = messageInput.value
	socket.emit('send-chat-message', message)
	messageInput.value = ''
})

function appendMessage(message) {
	const messageElement = document.createElement('div')
	messageElement.innerText = message
	messageContainer.append(messageElement)
}