import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Header(){
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
        <header className={styles.header}>
            <span>Bem vindo, {resposta.data['username']}</span>
            <nav>
                <Link to="/Republicas">Home</Link>
                <Link to="/inscricoes">Inscrições</Link>
                <Link to="/perfil">Perfil</Link>
            </nav>
        </header>
    )
}

export default Header