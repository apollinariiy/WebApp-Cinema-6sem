import io from "socket.io-client"
import { API_URL } from ".";
import showSocketMessage from './socketMessage'



let socket = "";

export const createSocket = () => {
    console.log(`${localStorage.getItem('token')}`);
    socket = io(API_URL, {
        extraHeaders: {
            Authorization: `${localStorage.getItem('token')}`
        }
    });

    socket.on('reserv-alert', (data) => {
        showSocketMessage(`Привет!🎬 Напоминаем вам, что в ${new Date(data.date).toISOString().substr(11, 5)} начнется сеанс, на который у вас есть билеты.`);
    });
    socket.on('access-error', (data) => {
        console.error("Сокет ошибка доступа:", data.message);
    });

    socket.emit('get-user-data');
};
export const disconnectSocket = () => {
    if (socket)
        return socket.disconnect();
};