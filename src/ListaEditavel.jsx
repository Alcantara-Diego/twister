import "./style/listaEditavel.scss"
import "./style/feed.scss"

import VoltarTela from "./VoltarTela"


import { BsPersonCircle } from "react-icons/bs";
import { useEffect } from "react";

function ListaEditavel(props){


    function carregarPerfil(username){
        document.getElementById("listaEditavel").style.display="none";

        props.alterarURL(`usuario/${username}`);

    }

    useEffect(()=>{
        console.log(props.conteudo)
    }, [props.conteudo])
    
    return (
        <div id="listaEditavel">
            <VoltarTela 
          
            funcao={"ocultarLista"}
            setaId={"fecharLista"}></VoltarTela>
            

            <ul>
                {/* Titulo da lista exibida */}
                {props.conteudo? <h2>{props.conteudo[1]}</h2>: null}

                {/* Listagem de conteúdo */}
                {props.conteudo? props.conteudo[0].map((item, index) =>(
                    <div key={index} className="itemLista">
                        <div className="usernameDiv">
                            
                            {item.fotoURL?
                            <img className="userFoto" src={item.fotoURL} alt="" />:

                             <BsPersonCircle className='userFoto'></BsPersonCircle>}
                            

                            <span>
                                <h4>{item.username}</h4>
                                <p>{item.recado}</p>
                            </span>
                        </div>
                        <button className="bordaGradient" onClick={()=>{carregarPerfil(item.username)}}>Ver Perfil</button>
                    </div>

                  
                )) : <div>Algo deu errado. Não foi possível carregar o conteúdo</div>}

               

                {/* Feedback de lista vazia */}
                {props.conteudo ? (
                    props.conteudo[0].length < 1 ? (
                        <div>Essa lista ainda não possui nenhum usuário.</div>
                    ) : null
                ) : null}
            </ul>
            
            
        
        </div>
    )
}


export default ListaEditavel