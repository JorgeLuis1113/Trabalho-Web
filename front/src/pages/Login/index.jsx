import styles from './Login.module.css'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function Login(){

    const schema = yup.object({
        email: yup.string().email('Email inválido').required('Email obrigatório'),
        password: yup.string().min(2,'Campo Senha Obrigatório').required(),
    });

    const [msg, setMsg] = useState(' ');

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/login', data);

            //Extrair o token
            const token = response.data;
            console.log(token)
            sessionStorage.setItem('token', token);
            if(token) 
                setMsg('Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    if(msg.toLowerCase().includes('autenticado')){
        return <Navigate to='/republicas' />
    }

    return(
        <>
            <section className={styles.container}>
                <p className={styles.titulo}>Login</p>
                <div className={styles.box}>
                    <form className={styles.forms} onSubmit={handleSubmit(submit)}>
                        <label htmlFor="email" placeholder="email">Email</label>
                        <input type="text" id="email" {...register('email')} />
                        <p className={styles.erro}>{errors.email?.message}</p>

                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" {...register('password')} />
                        <p className={styles.erro}>{errors.password?.message}</p>

                        <button className={styles.btn}>Login</button>

                        <section className={styles.botoes}>
                            <button className={styles.btn}><Link  className={styles.btn}to="/cadastro">Cadastre-se</Link></button>
                        </section>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;