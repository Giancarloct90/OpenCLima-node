const axios = require('axios');

const getClima = async (lat, long) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=10211c87728bbd1e3cb0ae58b34b18b1&units=metric`);
        return response.data.main.temp;
    } catch (e) {
        throw new Error('Ocurrio un error en la peticion hacia el servidor del clima', e);
    }
};

module.exports = {
    getClima
};