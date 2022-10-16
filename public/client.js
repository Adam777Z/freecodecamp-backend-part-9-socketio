document.addEventListener('DOMContentLoaded', (event) => {
	/* global io */
	var socket = io();

	socket.on('user', (data) => {
		document.querySelector('#num-users').textContent = data['currentUsers'] + ' users online';

		let message = data['name'];

		if (data['connected']) {
			message += ' has joined the chat.';
		} else {
			message += ' has left the chat.';
		}

		document.querySelector('#messages').innerHTML += '<li><b>' + message + '</b></li>';
	});

	socket.on('chat message', (data) => {
		document.querySelector('#messages').innerHTML += '<li>' + data['name'] + ': ' + data['message'] + '</li>';
	});

	// Form submission with new message in field with id 'm'
	document.querySelector('form').addEventListener('submit', (event2) => {
		event2.preventDefault(); // prevent form submit from refreshing page

		let messageToSend = document.querySelector('#m').value;
		socket.emit('chat message', messageToSend); // send message to server here
		document.querySelector('#m').value = '';
	});
});