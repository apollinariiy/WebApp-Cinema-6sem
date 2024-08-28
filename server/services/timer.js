const SocketService = require("./socketService");

setTimer = (io) => {
  setInterval(() => {
    SocketService.checkAndNotify(io);
  }, 10 * 60000);
}

module.exports = setTimer;