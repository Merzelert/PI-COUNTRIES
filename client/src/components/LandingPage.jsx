import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export const LandingPage = () => {
    return (
        <div className={styles.landImage}>
            <div className={styles.landText}>
                <h1>Henry Countries</h1>
                <h3>Busca paises y crea actividades</h3>
                <Link to='/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}
