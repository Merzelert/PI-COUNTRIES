import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postActivities, getCountries } from '../actions/index.js'
import { useDispatch, useSelector } from 'react-redux';
import styles from './NewActivity.module.css'

export function validate(input) {
    let error = {};
    if (!input.nombre) {
        error.nombre = "El nombre es requerido"
    } else if (/[0-9]/.test(input.nombre)) {
        error.nombre = "Nombre invalido"
    }

    if (!input.dificultad) {
        error.dificultad = "Debe ingresar una dificultad"
    } else if (!/\d/.test(input.dificultad)) {
        error.dificultad = "Debe ser un numero"
    } else if (input.dificultad < 1 || input.dificultad > 5)
        error.dificultad = "Debe ser un numero entre 1 y 5"

    if (!input.duracion) {
        error.duracion = "Debe ingresar una duracion"
    } else if (!/\d/.test(input.duracion)) {
        error.duracion = "Debe ser un numero"
    } else if (input.duracion < 1 || input.duracion > 24)
        error.duracion = "Debe ser un numero entre 1 y 24"

    if (!input.temporada) {
        error.temporada = "Debe ingresar una temporada"
    }

    if (!input.idpais) {
        error.idpais = "Debe selecccionar un pais"
    }

    return error;
}

export const NewActivity = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        "nombre": "",
        "dificultad": "",
        "duracion": "",
        "temporada": "",
        "idpais": []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e) {
            setInput({
                ...input,
                temporada: e.target.value
            })
            setError(validate({
                ...input,
                temporada: e.target.value
            }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            idpais: [...input.idpais, e.target.value]
        })
        setError(validate({
            ...input,
            idpais: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postActivities(input))
        alert('Actividad creada!!!')
        setInput({
            "nombre": "",
            "dificultad": "",
            "duracion": "",
            "temporada": "",
            "idpais": []
        })
        history.push('/home')
    }

    function handleDelete(el) {
        setInput({
            ...input,
            idpais: input.idpais.filter(pais => pais !== el)
        })

    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    return (
        <div className={styles.prevBtn}>
            <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            </div>

            <h1>Crea tu actividad</h1>

            <form className={styles.formStyle} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre de la actividad </label>
                    <input
                        type="text"
                        value={input.nombre}
                        name="nombre"
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        error.nombre && (
                            <p className={styles.warning}>{error.nombre}</p>
                        )
                    }
                </div>

                <div>
                    <label>Dificultad </label>
                    <input
                        type="number"
                        value={input.dificultad}
                        name="dificultad"
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        error.dificultad && (
                            <p className={styles.warning}>{error.dificultad}</p>
                        )
                    }
                </div>

                <div>
                    <label>Duracion en horas</label>
                    <input
                        type="number"
                        value={input.duracion}
                        name="duracion"
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        error.duracion && (
                            <p className={styles.warning}>{error.duracion}</p>
                        )
                    }
                </div>

                <div>
                    <label>Temporada estacional</label>
                    {/* "verano", "otoño", "primavera", "invierno" */}
                    <select onChange={(e) => handleCheck(e)}>
                        <option
                            name="verano"
                            value="verano"
                        >Verano
                        </option>

                        <option
                            name="otoño"
                            value="otoño"
                        >otoño
                        </option>

                        <option
                            name="primavera"
                            value="primavera"
                        >primavera
                        </option>

                        <option
                            name="invierno"
                            value="invierno"
                        >invierno
                        </option>
                    </select>
                    {
                        error.temporada && (
                            <p className={styles.warning}>{error.temporada}</p>
                        )
                    }

                </div>
                <div>
                    <label>Pais con esa actividad</label>
                    <select onChange={(e) => handleSelect(e)}>
                        {countries.map((pais) => (
                            <option value={pais.id}>{pais.nombre}</option>
                        ))}
                    </select>
                    {
                        error.idpais && (
                            <p className={styles.warning}>{error.idpais}</p>
                        )
                    }
                </div>

                <button className={styles.nextBtn} type='submit'>Crear Actividad</button>
            </form>
            {input.idpais.map(el =>
                <div className={styles.borrarPais}>
                    <p>Pais agregado: {el}</p>
                    <button onClick={() => handleDelete(el)}>Eliminar</button>
                </div>
            )}
        </div>
    )
}
