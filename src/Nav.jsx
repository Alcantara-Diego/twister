import './style/nav.scss'
import { useContext } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import { buscarPosts, buscarUsuarios } from './pastaFirebase/getData';
import { GiTwister } from "react-icons/gi";
import { IoPersonSharp } from "react-icons/io5";
import { useEffect } from 'react';
import { useState } from 'react';

function Nav() {

    const [nomeLogado, setNomeLogado] = useState("login");
    const [foto, setFoto] = useState(false);

    const { signInGoogle, usuarioLogado } = useContext(AuthGoogleContext);

    useEffect(() =>{

        if(usuarioLogado){
        
            setNomeLogado(usuarioLogado.displayName);
            setFoto(usuarioLogado.fotoURL)

        } else{
            setNomeLogado("login")
        }

    
            
     

    }, [usuarioLogado]);

    return (
        <nav className='bordaGradient'>
            <h1 className="logo">
                <span className="titulo">TWISTER</span>
                <GiTwister className='icone' />
                <span>alpha</span>
            </h1>

            <div className='navLogadoInfo' onClick={signInGoogle}>
                {nomeLogado}

                {foto? (
                <img className='fotoDePerfil' src={foto}></img>) : 

                (<IoPersonSharp /> )}
            
            </div>
        </nav>
    )
}

export default Nav;