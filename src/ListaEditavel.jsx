import "./style/listaEditavel.scss"
import "./style/feed.scss"

import VoltarTela from "./VoltarTela"


import { BsPersonCircle } from "react-icons/bs";

function ListaEditavel(props){


    function carregarPerfil(username){
        document.getElementById("listaEditavel").style.display="none";

        props.alterarURL(`usuario/${username}`);

    }
    
    return (
        <div id="listaEditavel">
            <VoltarTela 
          
            funcao={"ocultarLista"}
            setaId={"fecharLista"}></VoltarTela>
            

            <ul>
                <h2>TItulo</h2>

                {props.conteudo? props.conteudo.map((item, index) =>(
                    <div key={index} className="itemLista">
                        <div className="usernameDiv">
                            <BsPersonCircle className='userFoto'></BsPersonCircle>
                            <span>
                                <h4>{item.username}</h4>
                                <p>{item.recado}</p>
                            </span>
                        </div>
                        <button className="bordaGradient" onClick={()=>{carregarPerfil(item.username)}}>Ver Perfil</button>
                    </div>
                )) : ""}
            </ul>
            
            
        
        </div>
    )
}


export default ListaEditavel