const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
	socket.on('new-user', name => {
		users[socket.id] = name
		socket.broadcast.emit('user-connected', name)
	})

	socket.on('send-chat-message', message => {
		// Send message to every single other person connect on the server
		// Except for the person that sent the message
		socket.broadcast.emit('chat-message', {message: message, name: users[socket.id] })
	})

	socket.on('disconnect', message => {
		socket.broadcast.emit('user-disconnected', users[socket.id])
		delete users[socket.id]
	})
})