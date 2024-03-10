import './style/sidebar.scss'
import { useContext } from 'react';
import { donoPerfil } from './dbTeste';
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthGoogleContext } from './contexts/AuthGoogle';

import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";



function Sidebar(props) {

    const { usuarioLogado } = useContext(AuthGoogleContext);
    const url = useLocation();


    function carregarHome(){
        props.alterarURL("/");
        document.getElementById("listaEditavel").style.display="none";
    }

    function atualizarPerfil(){

        const usuarioNaURL = url.pathname.includes(usuarioLogado?.username)

        // Não permitir leitura na db se o perfil já estiver amostra
        if(usuarioNaURL){return}

        console.log(usuarioLogado)
        if(usuarioLogado){
            props.alterarURL(`usuario/${usuarioLogado.username}`);
        } else{
            console.log("need login")
            props.alterarURL("/login")
        }
        
        document.getElementById("listaEditavel").style.display="none";

    }


    function mostrarNotificacoes(){
        usuarioLogado?props.alterarURL("/notificacoes") : props.alterarURL("/login")


    }
    return (
        <ul className="sidebar bordaGradient">
            
            <div className="sidebarDesktop">

                <div className="sidebarGrupo">
                    <p>Categorias</p>

                    <li onClick={carregarHome}>
                        Home <IoHomeSharp />
                    </li>


                    <li className='desativado'>
                        Curtidos <FaHeart/>
                    </li>
                </div>

                <div className="sidebarGrupo">

                    <p>Pessoal</p>

                    <li className='desativado'>
                        Criar post <IoIosAddCircle />
                    </li>

                    <li onClick={()=>{mostrarNotificacoes()}}>
                        Notificações <IoMdNotifications />
                    </li>
                    
                    <li onClick={()=> atualizarPerfil()}>
                        Perfil <BsPersonCircle />
                    </li>
                
                </div>
            </div>

            <ul className="sidebarMobile" id='sidebarMobile'>
                <li onClick={carregarHome}>
                <IoHomeSharp />

                </li>
                <li className='desativado'>
                    <FaSearch />
                </li>
                <li className='desativado'>
                    <IoIosAddCircle />
                </li>
                <li onClick={()=>{mostrarNotificacoes()}}>
                    <IoMdNotifications />
                </li>
                <li onClick={()=> atualizarPerfil()}>
                    <BsPersonCircle />
                </li>
                
            </ul>

            
        </ul>

        
    )
}

export default Sidebar;