require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require("./routes");
const {setupWebsocket} = require('./websocket');


const app = express();

// agora tenho meu servidor fora do express
const server = http.Server(app);

setupWebsocket(server);

//Conecção com BD 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-m7gxb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database connected!'));

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, () => console.log(`🚀Executando em http://localhost:${process.env.PORT}`));