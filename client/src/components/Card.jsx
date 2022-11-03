import React from 'react'
import { Link } from "react-router-dom";
import styles from './Card.module.css'

export const Card = ({ nombre, imagenBandera, continente, id }) => {
    return (
        <div className={styles.card}>
            <Link to={"/" + id} >
                <div className={styles.imageContainer}>
                    <img src={imagenBandera} alt="img not found" width={200} />
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>{nombre}</h3>
                    </div>
                    <p>{continente}</p>
                </div>
            </Link>
        </div>
    )
}