import socketio, { Socket } from 'socket.io-client';

const socket = socketio('http://10.0.0.9:3333', {
    autoConnect: false
});

function subscribeToNewUsers(subscribeFunction) {
    socket.on('new-user', subscribeFunction);
};

function connect(latitude, longitude) {
    // como enviar esses dados para o backend?
    // atraves desse codigo opts:options, query:codigo
    socket.io.opts.query = {
        latitude,
        longitude
    };

    socket.connect();

}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewUsers
}