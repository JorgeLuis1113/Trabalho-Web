import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Perfil.module.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Perfil(){
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
            <section className={styles.container}>
                <p className={styles.titulo}>Perfil</p>
                <div className={styles.box}>
                    <section className={styles.secoes}>
                        <p className={styles.subtitulo}>Usuário</p>
                        <p>{resposta.data['username']}</p>
                    </section>
                    <hr/>
                    <section className={styles.secoes}>
                        <p className={styles.subtitulo}>Email</p>
                        <p>{resposta.data['email']}</p>
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