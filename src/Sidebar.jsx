import './style/sidebar.scss'

import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";

import { IoIosAddCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";


import { BsPersonCircle } from "react-icons/bs";

function resetTelaPrincipal(){
    console.log("entrou reset")
    const telaFeed = document.getElementById("telaFeed");
    const telaUsuarioInfo = document.getElementById("telaUsuarioInfo");

    telaUsuarioInfo.style.display="none";
    telaFeed.style.display="block";
}

function toggleTelaPrincipal(trigger){
    console.log(trigger)

    let telaFeed = document.getElementById("telaFeed");
    let telaUsuarioInfo = document.getElementById("telaUsuarioInfo");


    console.log(getComputedStyle(telaUsuarioInfo).display === "none")

    switch (trigger) {
        case "usuario":
            if(getComputedStyle(telaUsuarioInfo).display === "none"){
                telaUsuarioInfo.style.display = "block";
                telaFeed.style.display = "none";
            } else {
                resetTelaPrincipal();
            }
           

            
            break;
    
        default:
            break;
    }

    
}


function Sidebar () {
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
                    
                    <li onClick={()=> toggleTelaPrincipal("usuario")}>
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
                <li onClick={()=> toggleTelaPrincipal("usuario")}>
                    <BsPersonCircle />
                </li>
                
            </ul>

            
        </ul>

        
    )
}

export default Sidebar;