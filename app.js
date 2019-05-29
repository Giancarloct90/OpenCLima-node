// aqui estamos usando los yars con la diferencia que no estamos usando el command, si no que usamos el option para empezar usar opciones
// de una manera mas rapida 
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'nombre del pais',
        demand: true
    }
}).argv;

const {
    getLatLong
} = require('./lugar/lugar');

const {
    getClima
} = require('./clima/clima');

const colors = require('colors');

// getClima(14.0900, -87.2200).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.log(err);
// });



// getLatLong(argv.direccion).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.log(err);
// });

// en la funcion de abajo estamos usando el async y await a su mas alto nivel 
let getInfop = async (direccion) => {
    try {
        // en la variable latlongCiudad estamos almacenando lo que devuelve el return de la promesa getLatlong que nosotros creamos
        const latLongCiudad = await getLatLong(direccion);
        // en la constante temp estamos almacenando lo que devuelve la promesa que nosotros creamos getClima
        const temp = await getClima(latLongCiudad.lat, latLongCiudad.long);
        // aqui estamos retornando un objeto, un objeto esta formado en pares pero aqui solo estamos usando el nombre de la constantes previamente declaradas
        // en ES6 es permitido hacer esto, lo normal seria asi temp: temp, pero como las variables tiene el mismo nombre que la propiedades del objeto el ES6 
        // el ES6 lo interpreta que son el mismo nombre y se lo autoasigna y el codigo queda mas lejible sin tanta palabreria
        return {
            temp,
            latLongCiudad,
            direccion
        }
    } catch (e) {
        console.log(`Something trono en el algun punto aqui`, e);
    }
}

// estamos ejecuntando la promesa previmente creada arriba
getInfop(argv.direccion).then(response => {
    console.log('=============================== CLIMA ==================================='.green);
    console.log(`La temperatura de ${response.direccion.green} es de: ${response.temp} grados °C`);
    console.log(`Latitud: ${response.latLongCiudad.lat.green}`);
    console.log(`Longitud: ${response.latLongCiudad.long.green}`);
    console.log('========================================================================='.green);
}).catch(e => {
    console.log(e);
});