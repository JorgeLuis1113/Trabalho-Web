import styles from './Login.module.css'

function Login(){
    return(
        <>
            <section className={styles  .container}>
                <p>Login</p>
                <div className={styles.box}>
                    <label htmlFor="email" placeholder="email">Email</label>
                    <input></input>
                    <label htmlFor="senha" placeholder="email">Senha</label>
                    <input></input>
                    <button className={styles.btn}>Login</button>
                </div>
            </section>
        </>
    )
}

export default Login;