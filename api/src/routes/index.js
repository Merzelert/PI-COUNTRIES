const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map(e => {
        return {
            idName: e.cca3,
            name: e.name,
            image: e.flags,
            continent: e.continents,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/countries', async (req, res) => {
    const name = req.query.name
    try {
        const countriesTotal = await getAllInfo();
        if (name) {
            let countryName = await countriesTotal.filter(el => el.name.common.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
                res.status(200).json(countryName) :
                res.status(404).send('Pais no encontrado')
        } else {
            res.status(200).json(countriesTotal)
        }
    } catch (error) {
        res.json({ msg: "Error al intentar acceder al pais buscado" })
    }
})

router.get('/activity', async (req, res) => {

})


module.exports = router;
