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


function Sidebar (props) {

    function atualizarPerfil(){

        // mostrar perfil atualiza as informações com o perfil do usuário e retorna os posts que o usuário criou
        const posts = mostrarPerfil(donoPerfil)
        props.setCarregarDonoDoPerfil(posts)

    }
    return (
        <ul className="sidebar bordaGradient">
            
            <div className="sidebarDesktop">

                <div className="sidebarGrupo">
                    <p>Categorias</p>

                    <li onClick={resetTelaPrincipal}>
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
                <li onClick={resetTelaPrincipal}>
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