/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'; // importo los hooks que voy a usar de react
import { Link } from 'react-router-dom';
import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'; // importo los hooks que voy a usar de react-redux
import { getCountries, filterCountriesByContinent, filterActivityCreated, getActivities, orderByName, orderPopulation } from '../actions'; //importo las actions que usare en este componente
import { Card } from './Card'; // importo los componentes que usare
import { Paginado } from './Paginado';
import { SearchBar } from './SearchBar';
import { Footer } from './Footer';

// Comienzo
export const Home = () => {

    const dispatch = useDispatch() //para despachar nuestras actions
    const allCountries = useSelector((state) => state.countries) // aqui me traigo todo lo que esta en el estado countries
    const activities = useSelector((state) => state.activities) // aqui me traigo todo lo que esta en el estado actividades
    const [isLoading, setIsLoading] = useState(true)

    //paginado
    const [currentPage, setCurrentPage] = useState(1) //estado local
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    const [orden, setOrden] = useState('')
    const indexOfLastCountry = currentPage * countriesPerPage // 9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage// 0
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {//nos treaemos del estado los paises cuando el componente se monta
        setIsLoading(true)
        dispatch(getCountries());
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    }

    function handleClick(e) { // para resetear todos los paises
        e.preventDefault();//para que no se recargue la pagina de forma inesperada
        dispatch(getCountries())
        setCurrentPage(1);
    }

    function handleFilterContinent(e) {// cuando se modifique el filtro por continente se ejecutara esta funcion
        dispatch(filterCountriesByContinent(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterActivity(e) {
        e.preventDefault();
        dispatch(filterActivityCreated(e.target.value))
        setCurrentPage(1);
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
            <h2> 🇦🇷 🇦🇶 🇧🇷 🇨🇺 🇬🇦 🇭🇳 🇭🇷 🇪🇸 🇬🇷 🇩🇯  Countries PI - soyHENRY  🇺🇸 🇺🇾 🇸🇳 🇸🇲 🇶🇦 🇵🇰 🇵🇷 🏴󠁧󠁢󠁷󠁬󠁳󠁿 🇲🇽 🇲🇹</h2>
            <div className={styles.nav}>
                <Link to='/home'>
                    <button onClick={e => { handleClick(e) }}>Reestablecer</button>
                </Link>
                <div>
                    <SearchBar />
                </div>
                <button>Log Out</button>
            </div>
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
                        <option value={act.nombre} key={act.id}>{act.nombre}</option>
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
            <div>
                <Footer />
            </div>
        </div>
    )
}
