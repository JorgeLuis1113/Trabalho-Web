import { Link } from 'react-router-dom';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './Perfil.module.css'

function Perfil(){
    return(
        <>
            <Header />
            <section className={styles.container}>
                <p className={styles.titulo}>Perfil</p>
                <div className={styles.box}>
                    <section className={styles.secoes}>
                        <p className={styles.subtitulo}>Usuário</p>
                        <p>[Usuário]</p>
                    </section>
                    <hr/>
                    <section className={styles.secoes}>
                        <p className={styles.subtitulo}>Email</p>
                        <p>[Email]</p>
                    </section>
                    <hr/>
                    <section className={styles.secoes}>
                        <p className={styles.subtitulo}>Senha</p>
                        <p>[Senha]</p>
                    </section>
                </div>
                <section>
                    <button className={styles.btn}>Editar</button>
                    <button className={styles.btn}>Excluir</button>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default Perfil