import "./style/listaEditavel.scss"
import VoltarTela from "./VoltarTela";
import { ImNewspaper } from "react-icons/im";
import { GiTwister } from "react-icons/gi";


function Timeline(props){
    return (
        <div id="timeline">
            <VoltarTela 
          
            funcao={"home"}
            setaId={"fecharTimeline"}></VoltarTela>
            
            {props.info=="timeline"? (

                <ul className="timelineLista">
                    <h2>Timeline</h2>
             
                    <li className="itemLista">
                        <div className="info">
                            <GiTwister className="icone"/>
                            <div className="principal">
                                
                                <h4>Twister versão alpha sendo lançada</h4>
                                <p>01/03/2024</p>

                            </div>


                        </div>
                    </li>
                </ul>
            ) : null}
                

                
               
            
            
        
        </div>
    )
}

export default Timeline;