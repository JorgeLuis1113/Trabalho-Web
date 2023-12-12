import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import logo from './images/logo-poquito.png'

function Card(){
    return(
        <section className={styles.card}>
            <img src={logo} className={styles.logo}/>
            <p className={styles.titulo}>[Nome da República]</p>
            <p>Texto descritivo da república</p>
            <button className={styles.btn}>
                <Link to="/Rep" className={styles.links}>Informações</Link>
            </button>
        </section>
    )
}

export default Card;