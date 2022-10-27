/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styles from './Paginado.module.css'

export const Paginado = ({ countriesPerPage, allCountries, paginado }) => {

    const pageNumbers = []

        for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){ //Redondear todos los paies entre la cantidad de paises que quiero por pagina
            pageNumbers.push(i)
        }
        
    return (

        <nav>
            <ul className={styles.paginado} >
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className='number' key={number}>
                            <a onClick={()=> paginado(number)} href="#" >{number}</a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}
