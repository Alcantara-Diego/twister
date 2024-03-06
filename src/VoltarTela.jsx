import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function VoltarTela(props){

    const navigate = useNavigate();


    useEffect(()=>{
        if(props.funcao){

            let seta = document.getElementById(props.setaId);

            if(seta){
                switch (props.funcao) {

                    case "home":
                       
                        seta.addEventListener("click", () =>{

                            navigate("/");
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