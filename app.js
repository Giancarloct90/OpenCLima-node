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

let getInfop = async (direccion) => {
    try {
        const latLongCiudad = await getLatLong(direccion);
        const temp = await getClima(latLongCiudad.lat, latLongCiudad.long);
        return {
            temp,
            latLongCiudad,
            direccion
        }
    } catch (e) {
        console.log(`Something trono en el algun punto aqui`, e);
    }
}

getInfop(argv.direccion).then(response => {
    console.log('=============================== CLIMA ==================================='.green);
    console.log(`La temperatura de ${response.direccion.green} es de: ${response.temp} grados °C`);
    console.log(`Latitud: ${response.latLongCiudad.lat.green}`);
    console.log(`Longitud: ${response.latLongCiudad.long.green}`);
    console.log('========================================================================='.green);
}).catch(e => {
    console.log(e);
});