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

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
            const act = await Activity.findOne({  // get para buscar actividad por id
                where : {id},
                include: Country  
                })
                return res.json(act) 
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    const { nombre, dificultad, duracion, temporada, idpais} = req.body

    try {
        if(!nombre || !dificultad || !duracion || !temporada || !idpais){
            return res.status(404).send('Falta enviar datos obligatorios')
        } else {
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
        }
        

    } catch (error) {
        return res.status(404).send('Ocurrio un error', error)
    }
})

router.put('/', async (req, res)=> {
    const { nombre, dificultad, duracion, temporada, idpais, id} = req.body
    try {
        const editAct = await Activity.upsert({
                id,
                nombre,
                dificultad,
                duracion,
                temporada
        });
        const pushCountry = await Country.findAll({
            where: {
                id: idpais,
            }
        })
        await editAct.addCountry(pushCountry)
        return res.send("Actividad editada correctamente")
        
    } catch (error) {
        return res.send(error)
    }
})

router.delete('/:id', async (req, res)=> {
    const { id } = req.params
    try {
        const deleteActById = await Activity.findOne({
                where : {id}
        });
        if(deleteActById){
            await deleteActById.destroy();
        } 
        return res.send("Actividad eleminada")
        
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router;