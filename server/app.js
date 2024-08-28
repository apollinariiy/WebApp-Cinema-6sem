const express = require("express");
const app = express();
require('dotenv').config();
const userRouter = require("./routes/userRouter.js");
const authRouter = require("./routes/authRouter.js");
const sessionRouter = require("./routes/sessionRouter.js");
const reservRouter = require("./routes/reservRouter.js");
const movieRouter = require("./routes/movieRouter.js");
const hallRouter = require("./routes/hallRouter.js");
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const StripeWebhookHandler = require('./services/stripeService.js');
const { Server } = require('socket.io');
const https = require('https');
const fs = require('fs');
const setTimerNotifyUsers = require('./services/timer.js');

const cookieParser = require("cookie-parser");
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware.js');


app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
const bodyParser = require('body-parser');
const socketMiddleware = require("./middleware/socketMiddleware.js");
const SocketService = require("./services/socketService.js");

const stripeWebhookHandler = new StripeWebhookHandler(process.env.ENDPOINT_SECRET);

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  stripeWebhookHandler.handleWebhook(request, response);
});

app.use(express.json());
app.use("/user", userRouter);
app.use("/reservation", reservRouter);
app.use('/auth', authRouter);
app.use('/session', sessionRouter);
app.use('/movie', movieRouter);
app.use('/hall', hallRouter);

app.use(errorMiddleware);

const options = {
  key : fs.readFileSync("localhost-key.pem"),
  cert : fs.readFileSync("localhost.pem"),
}

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  }
});

io.use(socketMiddleware)
io.on('connection', (socket) => {
  socket.on('get-user-data', () => {
    SocketService.addUser(socket.user.id, socket.id);
    SocketService.checkAndNotify(io);
  });
  socket.on('disconnect', () => {
    SocketService.deleteUser(socket.id);
  });
});
setTimer(io);


server.listen(4242, () => console.log("Сервер запущен и ожидает подключения..."));