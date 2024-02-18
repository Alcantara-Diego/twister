import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";


function VoltarTela(props){


    useEffect(()=>{
        if(props.funcao){

            let seta = document.getElementById(props.setaId);

            if(seta){
                switch (props.funcao) {

                    case "home":
                       
                        seta.addEventListener("click", () =>{

                            props.alterarURL("/")
                        })
                        
                        break;
    
                    case "ocultarLista":
                        
                        seta.addEventListener("click", ()=>{

                            document.getElementById("listaEditavel").style.display="none"
                        })
    
                        break;
                
                    default:
                        break;
                }

            }

            
        }

    }, [props.funcao])



    return(
        <div className="voltarFeed">
        <FaArrowLeft className="seta" id={props.setaId}/>
        <p>Voltar</p>
    </div>
    )
}

export default VoltarTela