const { Router } = require('express');
const countries = require('./countries.js')
const activity = require('./activity.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries);
router.use('/activities', activity);

// const { Router } = require('express');
// const axios = require('axios');
// const { Country, Activity } = require('../db');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');


// const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

// const getApiInfo = async () => {
//     const apiUrl = await axios.get('https://restcountries.com/v3/all');
//     const apiInfo = await apiUrl.data.map(e => {
//         return {
//             idName: e.cca3,
//             name: e.name,
//             image: e.flags,
//             continent: e.continents,
//             capital: e.capital,
//             subregion: e.subregion,
//             area: e.area,
//             population: e.population
//         };
//     });
//     const bdSave = await Country.bulkCreate(getApiInfo);
//     return apiInfo;

// };

// const getDbInfo = async () => {
//     return await Country.findAll({
//         include: {
//             model: Activity,
//             attributes: ["name"],
//             through: {
//                 attributes: []
//             }
//         }
//     })
// }

// const getAllInfo = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal
// }

// router.get('/countries', async (req, res) => {
//     const name = req.query.name
//     try {
//         const countriesTotal = await getAllInfo();
//         if (name) {
//             let countryName = await countriesTotal.filter(el => el.name.common.toLowerCase().includes(name.toLowerCase()))
//             countryName.length ?
//                 res.status(200).json(countryName) :
//                 res.status(404).send('Pais no encontrado')
//         } else {
//             res.status(200).json(countriesTotal)
//         }
//     } catch (error) {
//         res.json({ msg: "Error al intentar acceder al pais buscado" })
//     }
// })

// router.get('/countries/:idPais', async (req, res) => {
//     const idPais = req.params.idPais;
//     try {
//         const id = await Country.findOne({
//             where: {idName: idPais}, 
//             include: {model: Activity}
//         })
//         if (id){
//             return res.status(200).json(id)
//         } else {
//             return res.status(400).send('Pais inexistente')
//         }
//     } catch (error) {
//         res.status(404).send('Error al buscar por id')
//     }
// })

// router.get('/activities', async (req, res) => {
//     try {
//             const activities = await Activity.findAll({  // get para el select en el front que ordena por actividades
//                 include: Country  
//                 })
//                 return res.json(activities) 
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.post('/activities', async (req, res) => {
    
//     const { name, difficulty, duration, season, countries} = req.body

//     try {
//         const newActivity = await Activity.create({
//             name,
//             difficulty,
//             duration,
//             season
//         })

//         const pushCountry = await Country.findOne({
//             where: {
//                 id: countries,
//             }
//         })
//         await newActivity.addCountry(pushCountry)  //mixing sequelize add + nombreTabla
//         res.sendStatus(201)

//     } catch (error) {
//         res.send(error)
//     }
// })
    
//     // const {name, difficulty, duration, season, countries} = req.body;
//     // try {
//     //     //Manejo de errores e
//     // if (!name || !difficulty || !duration || !season || !countries) throw new Error('Faltan pasar datos');
//     // //Creación de nueva actividad e
//     // const newActivity =  await Activity.create({
//     //     name,
//     //     difficulty,
//     //     duration,
//     //     season,
//     // })

//     // const activity = await Activity.findByPk(newActivity.id); //Busco la actividad recién creada
//     // await activity.setCountries(countries) //Seteo los países designados a dicha actividad

//     // //Busco la actividad recién relacionada con sus respectivos países 
//     // const relation = await Activity.findAll({ 
//     //     where: {
//     //         id: newActivity.id
//     //     },
//     //     include: {
//     //         model: Country,
//     //         through: {
//     //             attributes: []
//     //         }
//     //     }
//     // })
    
//     // return res.status(201).json(relation)
//     // } catch (error) {
//     //     res.status(400).send("Error al crear la actividad " + error)
//     // }
    
// // })

module.exports = router;
