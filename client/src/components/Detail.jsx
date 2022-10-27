import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // importo los hooks que voy a usar de react-redux
import { useEffect } from 'react'; // importo los hooks que voy a usar de react
import { getDetail } from '../actions'; //importo las actions que usare en este componente
import styles from './Detail.module.css'
export const Detail = (props) => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const country = useSelector((state) => state.detail)

    return (
        <div className={styles.detailsContainer}>
            <Link to='/home'>
                <button>Volver...</button>
            </Link>
            <div>
                <img className={styles.detailImage} src={country.imagenBandera} alt="bandera" />
            
            </div>
            
            <div>
                <div className={styles.textDetails}>
                    <h2>{country.nombre} - {country.id}</h2>
                    <h5>Habitantes: {country.poblacion} millones</h5>
                    <h5>Capital: {country.capital}</h5>
                    <h5>Subregion: {country.subregion}</h5>
                    <h5>Area: {country.area} kilometros</h5>
                    <h2>Actividades Creadas: {country.activities?.map(a =>
                    (
                        <div className={styles.textActDet}>
                            <h5>Nombre : {a.nombre}</h5>
                            <h5>Dificultad : {a.dificultad}</h5>
                            <h5>Duracion : {a.duracion} horas</h5>
                            <h5>Estacion : {a.temporada}</h5>
                        </div>
                    )
                    )} </h2>
                </div>
            </div>
        </div>
    )
}
