const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Запуск сервера
const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// Отслеживание URL-адреса и отображение нужной HTML страницы
app.get('/', function(request, respons) {
  respons.sendFile(__dirname + '/index.html');
});

// Обработка подключения клиента
io.on('connection', (socket) => {
  console.log('Новый пользователь подключился');

  // Обработка события от клиента
  socket.on('myEvent', (data) => {
    console.log('Получено событие от пользователя:', data);
  });

  // Функция получающая сообщение от какого-либо пользователя
  socket.on('send mess', function(data) {
    // Внутри функции мы передаем событие 'add mess',
    // которое будет вызвано у всех пользователей и у них добавится новое сообщение
    io.sockets.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
  });

  // Обработка отключения клиента
  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});
