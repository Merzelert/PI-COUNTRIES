const { Router } = require('express');
const router = Router();
const { Activity, Country } = require('../db')

router.get('/', async (req, res) => {
    try {
            const activities = await Activity.findAll({  // get para el select en el front que ordena por actividades
                include: Country  
                })
                return res.json(activities) 
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    const { nombre, dificultad, duracion, temporada, idpais} = req.body

    try {
        const newActivity = await Activity.create({
            nombre,
            dificultad,
            duracion,
            temporada
        })

        const pushCountry = await Country.findAll({
            where: {
                id: idpais,
            }
        })
        await newActivity.addCountry(pushCountry)  //mixing sequelize add + nombreTabla
        res.status(201).send('Actividad creada')

    } catch (error) {
        res.send(error)
    }
})


module.exports = router;