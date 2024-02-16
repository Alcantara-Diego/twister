import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";


function VoltarTela(props){

    const [setaFuncao, setSetaFuncao] = useState("")

    useEffect(()=>{
        console.log(props.funcao)
        if(props.funcao){

            let seta = document.getElementById(props.setaId);

            if(seta){
                switch (props.funcao) {

                    case "home":
                        console.log("case home")
                        seta.addEventListener("click", () =>{

                            props.alterarURL("/")
                        })
                        
                        break;
    
                    case "ocultarLista":
                        console.log("case lista")
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