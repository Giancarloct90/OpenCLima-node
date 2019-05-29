// inicializamos una contante para poder usar el paquete de axios que nos sirve para poder hacer peticiones a servidores API
// la diferencia entre rest y axios es que rest funciona con callback y axios funciona con Promises

const axios = require('axios');

// creamos una funcion getclima que recibe como parametros dos numero que son la latitud y longitud
// 
const getClima = async (lat, long) => {
    try {
        // estammos creando una constante con la cual almacenaremos lo que nos retorne de la promesa que retorna el objeto creado de tipo axios
        // como el api del clima la peticion get se configuraba mas facil que la de api de geoLocalitation solo lleva como parametro el url
        // url que primero probamos con postman, y tambien a URL le estamos pasando como parametro las varibles lat y long concatenadas con un template literal
        // con una promesa estariamos resolviendo la promesa de axios.get con el then y dentro del then un funcion anonima para trabajar lo que la promesa nos retorno
        // con el await el return de la promesa del axios.get se lo estamos asignando a la constante response, ya sea que regresa un boolean, arreglo de objetos, o un msj
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=10211c87728bbd1e3cb0ae58b34b18b1&units=metric`);
        // retornamos un valor que lo obtenemos de lo que nos devuelve la promesa de axios.get
        return response.data.main.temp;
    } catch (e) {
        throw new Error('Ocurrio un error en la peticion hacia el servidor del clima', e);
    }
};

module.exports = {
    getClima
};