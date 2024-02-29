import { useContext } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import './style/login.scss'
import './style/nav.scss'

import { GiTwister } from "react-icons/gi";

function Login(){

    const { signInGoogle, usuarioLogado } = useContext(AuthGoogleContext);
    return(
        <div className='loginDiv centralizar'>

            <h1 className="logo bordaGradient">
                
                <span className="titulo">TWISTER</span>
                <GiTwister className='icone' />

             </h1>

            <div className="conteudo">
    
                <h1>É necessário estar logado para acessar essa função</h1>

                <h2>Clique aqui para fazer seu login ou criar sua conta</h2>

                <button onClick={signInGoogle}>login</button>
            </div>
        </div>
    )
}


export default Login;