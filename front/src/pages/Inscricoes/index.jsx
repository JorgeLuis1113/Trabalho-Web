import Inscricao from '../../components/Inscricao'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './Inscricoes.module.css'
import { useState } from 'react'

function Inscricoes(){

    const[repositories, setRepositores] = useState([])

    

    return(
        <>
            <Header />
            <section className={styles.container}>
                <p className={styles.titulo}>Inscrições</p>
                <div className={styles.box}>
                    <Inscricao />
                    <Inscricao />
                    <Inscricao />
                    <Inscricao />
                    <Inscricao />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Inscricoes