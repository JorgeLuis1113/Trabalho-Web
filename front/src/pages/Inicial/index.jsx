import { Link } from 'react-router-dom';
import styles from './Inicial.module.css'

function Inicial(){
    return(
        <>
            <section className={styles.container}>
                <div className={styles.apresentacao}>
                    <p>Encontre a república ideal para você!</p>
                    <section className={styles.botoes}>
                        <button className={styles.btn}>
                            <Link to="/Login">Login</Link>
                        </button>
                        <button className={styles.btn}>
                            <Link to="/Cadastro">Cadastro</Link>
                        </button>
                    </section>
                </div>
            </section>
        </>
    )
}

export default Inicial;