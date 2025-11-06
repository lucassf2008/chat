const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO - mensagens em tempo real
io.on('connection', (socket) => {
  console.log('🟢 Usuário conectado');

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Usuário desconectado');
  });
});

// Iniciar servidor (Render usa PORT dinâmica)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
