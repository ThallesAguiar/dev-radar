const socketio = require('socket.io');

const calculateDistance = require('./utils/calculateDistance');
// const parseStringAsArray = require('./utils/parseStringAsArray');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id);

        // socket.handshake.query: recebo as opts do lado client
        console.log(socket.handshake.query);

        const { latitude, longitude } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            // passions: parseStringAsArray(passions),
        });
    });
};

exports.findConnections = (coordinates) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10; //10 é o KM 
        // && connection.passions.some(item => passion.includes(item)) outra condição. Caso tiver uma paixão que ele pesquisou, ela será incluída.
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}