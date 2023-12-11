import { Link } from 'react-router-dom';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import logo from './images/logo-poquito.png'
import imagem from './images/poquito.png'
import styles from './Rep.module.css'

function Rep(){
    return(
        <>
            <Header />
            <section className={styles.container}>
                <img src={logo} className={styles.logo}></img>
                <p className={styles.titulo}>[Nome da República]</p>
                <div className={styles.box}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, eaque illum sed fuga aliquid eum rerum quae culpa dignissimos at adipisci labore minus ratione voluptas ipsum quia magnam suscipit. Eos.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, eaque illum sed fuga aliquid eum rerum quae culpa dignissimos at adipisci labore minus ratione voluptas ipsum quia magnam suscipit. Eos.</p>
                    <img src={imagem} className={styles.imagem}/>
                    <button className={styles.btn}><Link to='/formulario' >Inscreva-se</Link></button>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Rep