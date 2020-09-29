import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;

/*
    IOS com emulador: localhost
    IOS com fisico: IP da maquina
    Android com emulador: localhost 
*/
