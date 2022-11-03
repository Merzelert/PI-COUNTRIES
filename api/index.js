//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require('./src/db');
const axios = require('axios');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
// Aqui pido la informacion de la API y la guardo en la Base de datos con bulkCreate para posteriormente trabajar con esa informacion directamente desde la bs
    server.listen(3001, async () => {
        const allCountries = Country.findAll();//buscar todos los paises en la bd
        if (!allCountries.length) { // si esta vacio se hace la busqueda y se crea la bd
            const apiCountriesResponse = await axios.get('https://restcountries.com/v3/all');
            let apiCountries = apiCountriesResponse.data.map((e) => {
                return {
                    id: e.cca3,
                    nombre: e.name.common,
                    imagenBandera: e.flags[0],
                    continente: e.continents[0],
                    capital: e.capital ? e.capital[0] : 'Not found',
                    subregion: e.subregion,
                    area: e.area,
                    poblacion: e.population
                }
            })
            await Country.bulkCreate(apiCountries);//le paso el array con el objeto de la informacion requerida y llena los campos conforme al modelo en la bd
            console.log('Base de datos creada')
        }
        console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
});
