/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'
import { useState, useEffect } from 'react'; // importo los hooks que voy a usar de react
import { useDispatch, useSelector } from 'react-redux'; // importo los hooks que voy a usar de react-redux
import { getCountries, filterCountriesByContinent, filterActivityCreated, getActivities, orderByName, orderPopulation } from '../actions'; //importo las actions que usare en este componente
import { Card } from './Card'; // importo los componentes que usare
import { Paginado } from './Paginado';
import { SearchBar } from './SearchBar';

// Comienzo
export const Home = () => {

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [isLoading, setIsLoading] = useState(true)

    //paginado
    const [currentPage, setCurrentPage] = useState(1) //estado local
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const [orden, setOrden] = useState('')
    const indexOfLastCountry = currentPage * countriesPerPage // 10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // 0
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    //pag---------index 1er pais------index ultimo pais
    // 1----------------0--------------------12
    // 2----------------13-------------------24

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setIsLoading(true)
        dispatch(getCountries());
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch])
    
        if (isLoading){
        return <div>Loading...</div>
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleFilterContinent(e) {// cuando se modifique el filtro por continente se ejecutara esta funcion
        dispatch(filterCountriesByContinent(e.target.value))
    }

    function handleFilterActivity(e) {
        e.preventDefault();
        dispatch(filterActivityCreated(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortPop(e) {
        e.preventDefault();
        dispatch(orderPopulation(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={styles.home}>
            <h2>Countries PI - soyHENRY</h2>
            <div>
                <SearchBar />
            </div>
            <Link to='/home'>
                <button onClick={e => { handleClick(e) }}>
                    Volver a cargar todos los paises
                </button>
            </Link>
            <div className={styles.filtros}>
                <span>Orden Alfabetico</span>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <span>Poblacion</span>
                <select onChange={e => handleSortPop(e)}>
                    <option value="desc">Mayor poblacion</option>
                    <option value="asc">Menor poblacion</option>
                </select>

                <span>Continentes</span>
                <select onChange={e => handleFilterContinent(e)}>
                    <option value="todos">Todos los continente</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <span>Actividades</span>
                <select onChange={e => handleFilterActivity(e)}>
                    <option value="todas">Todas</option>
                    {activities.map((act) => (
                        <option value={act.nombre}>{act.nombre}</option>
                    ))}
                </select>
            </div>
            <Link to='/activities'>Crear actividad</Link>


            <div>
                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />
            </div>
            <div className={styles.main}>
                {currentCountries?.map((e) => {
                    return (
                        <div key={e.id}>

                            <Card key={e.id} nombre={e.nombre} imagenBandera={e.imagenBandera} continente={e.continente} id={e.id} />

                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}
