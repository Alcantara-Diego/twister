import './style/sidebar.scss'
import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";

import { resetTelaPrincipal, toggleTelaPrincipal } from './functions/telas';
import { donoPerfil } from './dbTeste';
import { mostrarPerfil } from './functions/users';

import { useNavigate } from 'react-router-dom'

function Sidebar(props) {

    const navigate = useNavigate();

    function carregarHome(){

        navigate('/');
        // props.atualizarApp();

    }

    function atualizarPerfil(){

        navigate("perfil");
        // props.atualizarApp();

    }
    return (
        <ul className="sidebar bordaGradient">
            
            <div className="sidebarDesktop">

                <div className="sidebarGrupo">
                    <p>Categorias</p>

                    <li onClick={carregarHome}>
                        Home <IoHomeSharp />
                    </li>

                    <li>
                        Notificações <IoMdNotifications />
                    </li>

                    <li>
                        Curtidos <FaHeart/>
                    </li>
                </div>

                <div className="sidebarGrupo">

                    <p>Pessoal</p>

                    <li>
                        Criar post <IoIosAddCircle />
                    </li>

                    <li>
                        Notificações <IoMdNotifications />
                    </li>
                    
                    <li onClick={()=> atualizarPerfil()}>
                        Perfil <BsPersonCircle />
                    </li>
                
                </div>
            </div>

            <ul className="sidebarMobile">
                <li onClick={carregarHome}>
                <IoHomeSharp />

                </li>
                <li>
                    <FaSearch />
                </li>
                <li>
                    <IoIosAddCircle />
                </li>
                <li>
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