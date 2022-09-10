const express = require('express')
const socket = require('socket.io')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

const server = app.listen(PORT, () => {
  console.log(`Servior iniciado en el puerto ${PORT}`)
})

let total = 0;
const donantes = [];

const io = socket(server);

io.on('connection', (socket) => {
  // Se envia el historico de donantes
  socket.emit('historico', { donantes, total });

  socket.on('enviar-donacion', (datos) => {
    //console.log({ datos })
    total += (+datos.monto);
    const persona = `${datos.nombre} (${datos.dni})`;
    donantes.push(persona)

    const mensaje = {
      persona,
      total
    }

    // ENVIO A TODOS
    io.sockets.emit('respuesta', mensaje)
  })
})