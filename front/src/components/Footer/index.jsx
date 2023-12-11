import styles from './Footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
            <span>Colaboradores:</span>
            <ul>
                <a href=''>Jorge Alexandre</a>
                <a href=''>João Vitor</a>
                <a href=''>André</a>
            </ul>
        </footer>
    )
}

export default Footer;