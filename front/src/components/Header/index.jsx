import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header(){
    return(
        <header className={styles.header}>
            <span>Bem vindo, [Nome do Candidato]</span>
            <nav>
                <Link to="/Republicas">Home</Link>
                <Link to="/inscricoes">Inscrições</Link>
                <Link to="/perfil">Perfil</Link>
            </nav>
        </header>
    )
}

export default Header