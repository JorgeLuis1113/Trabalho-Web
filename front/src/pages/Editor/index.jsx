import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Login.module.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState, useEffect} from 'react';

function Editor() {

    // Validando Token para obter informações do usuário
    const [validado, setValidado] = useState(false);
    const [resposta, setResposta] = useState(null);

    const config = {
        headers:{
            'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
        }
    }

    useEffect(() => {
        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/descrypt`, config);

                //Armazena o objeto da requisição na variável "resposta"
                setResposta(resposta)
                
                if (resposta.status === 200) {
                    setValidado(true);
                }
            }
            catch(error){
                setValidado(false);
            }
        }
        
        valida();
    }, []);
    
    if(!validado){
        return <p>Token Inválido</p>
    }

    
    return(
        <>
            <Header />
            <p className={styles.titulo}>Edição de informações pessoais</p>
            <section className={styles.container}>
                <form className={styles.forms}>
                    <div className={styles.box}>
                        <div className={styles.divi}>
                            <p className={styles.titulo2}>Email atual</p>
                            <p className={styles.titulo2}>{resposta.data['email']}</p>
                        </div>
                        <hr className={styles.hr}/>
                        <label htmlFor="email" placeholder="email">Novo email</label>
                        <input type="text" id="email"/>
                        <label htmlFor="emailConf" placeholder="emailConf">Confirme o email</label>
                        <input type="text" id="emailConf"/>
                        <button className={styles.btn}>Alterar</button>
                    </div>
                </form>
                <form className={styles.forms}>
                    <div className={styles.box}>
                        <div className={styles.divi}>
                            <p className={styles.titulo2}>Username atual</p>
                            <p className={styles.titulo2}>{resposta.data['username']}</p>
                        </div>
                        <hr className={styles.hr}/>
                        <label htmlFor="username" placeholder="username">Novo username</label>
                        <input type="text" id="username"/>
                        <label className={styles.hiddenInput} htmlFor="username" placeholder="username">Novo username</label>
                        <input className={styles.hiddenInput} type="text" id="username"/>
                        <button className={styles.btn}>Alterar</button>
                    </div>
                </form>
                <form className={styles.forms}>
                    <div className={styles.box}>
                        <div className={styles.divi}>
                            <p className={styles.titulo2}>Alterar</p>
                            <p className={styles.titulo2}>Senha</p>
                        </div>
                        <hr className={styles.hr}/>
                        <label htmlFor="senha" placeholder="senha">Nova senha</label>
                        <input type="text" id="senha"/>
                        <label htmlFor="senhaConf" placeholder="senhaConf">Confirme a senha</label>
                        <input type="text" id="senhaConf"/>
                        <button className={styles.btn}>Alterar</button>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    )
}

export default Editor