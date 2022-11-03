import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { auth } from '../firebase';

export const LandingPage = () => {

    const SignInWithFirebase = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    return (
        <div className={styles.landImage}>
            <div className={styles.landText}>
                <h1>Henry Countries</h1>
                <h3>Busca paises y crea actividades</h3>
                <Link to='/home'>
                    <button onClick={SignInWithFirebase}>
                        Ingresa con Google
                    </button>
                </Link>
            </div>
        </div>
    )
}
