import { Link } from 'react-router-dom'
import styles from './Inscricao.module.css';
import logo from './images/logo-poquito.png'

function Inscricao(){
    return(
        <>
            <section className={styles.inscricao}>
                <img src={logo} className={styles.logo}/>
                <p className={styles.titulo}>[Nome da República]</p>
                <p>Nome:</p>
                <p>Idade:</p>
                <p>Cidade:</p>
                <p>Sobre:</p>
                <div className={styles.buttons}>
                    <button className={styles.btn}>Editar</button>
                    <button className={styles.btn}>Excluir</button>
                </div>
            </section>
        </>
    )
}

export default Inscricao;