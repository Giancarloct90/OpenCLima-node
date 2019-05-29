//Aqui estamos creando una varaible del objeto de tipo axios. para poderlo usar en el futuru
// el axios no sirve para hacer consultas a servicos API igual que el rest, con la diferencia que el axios trabaja con Promises

const axios = require('axios');



//estamos creando una funcion async para poder usar el await, recibe un parametro que es el nombre de la ciudad, 
// con este parametro estamos haciendo peticiones a un servidor que tiene un api y para esto estamos usando el axios
// con la funcion encodeURI() nos sirve para pasar un string a un enlace seguro con caracteres especiales, el encodeURI escapa al string
let getLatLong = async (direcion) => {
    try {

        //console.log(argv.direccion);
        // con esta comando transformamos nuestra string en carcateres especiales, un url seguro, escapa al string o en ingles creo que seria scape
        const encodeURL = encodeURI(direcion);

        // creamos una constante que la igualamos a una funcion que recibe un objeto de parametro,
        // este objeto lleva la propiedad url. que el url del servidor, y lleva el nombre de la ciudad
        // tambien lleva el header que asu vez contiene el API KEY que es proporcionada por el que distribuye la API
        const intance = axios.create({
            baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ encodeURL}`,
            headers: {
                'X-RapidAPI-Key': '139c631806msh8077c1d9053387cp1ef20cjsn8a34cdff57f1'
            }
        });

        // creamos uns constante de tipo respuesta que asu vez almacenara la respuesta optenida de la promesa, por que el pauqete AXIOS funciona con promesas
        // la respuesta de dicha promesa la almacenamos en la contante respuesta conm un await de esta manera la respuesta positiva se almacenara en dicha constante
        const respuesta = await intance.get();
        // la promesa de intance.get() lo que nos devuelve es un objeto con muchos objetos y arreglo a su interior,
        // lo que nosotros necesitamos es el objeto data que a su vez contiene un arreglo de onjeto llamado Results
        // revisamos si el arreglo esta vacio de ser asi mandamos un error
        if (respuesta.data.Results.length === 0) {
            throw new Error(`Hubo un error con la direccion introducida ${direcion}`);
        }
        // para poder hacer el uso del arreglo que nostros necesitamos mas facil creamos una constante y la igualmos al arreglo que necesitamos
        // asi no estamos escribiendo todo eso que se necesita para poder obtener los datos 
        const data = respuesta.data.Results[0];
        const dir = data.name;
        const lat = data.lat;
        const long = data.lon;

        // con el ES6 estamos retornando un objeto que este objeto se iguala a las constante previamente creadas
        // ya no es necesario para que se auto asignen solo necesitamos crear las contantes y los nombre de las propiedades del objeto con el mismo nombre
        // entonces el ES6 se va encargar de asignarlos
        return {
            dir,
            lat,
            long
        };
    } catch (e) {
        throw new Error(`Ocurrio un error en la peticion para obtener la lon, y lat`, e);
    }
};

module.exports = {
    getLatLong
};