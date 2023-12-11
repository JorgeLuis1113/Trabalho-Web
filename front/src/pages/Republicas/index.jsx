import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import styles from './Republicas.module.css'

function Republicas(){
    return(
        <>
            <Header />
            <section className={styles.container}>
                <p className={styles.titulo}>Repúblicas</p>
                <div className={styles.box}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Republicas