import "./style/alerta.scss"
import { fecharAlerta } from "./functions/telas";

function Alerta(){

   
    return(
        <div id="AlertaSombra">
            <div id="alertaDiv">
                
                <h2>Alerta</h2>

                <p>Tem certeza que deseja apagar o post selecionado? Ele não poderá ser restaurado futuramente</p>

                <div className="btnDiv">
                    <button id="cancelarDeleteBtn" onClick={fecharAlerta}>Cancelar</button>
                    <button id="confirmarDeleteBtn">Deletar</button>
                </div>
            </div>
        </div>
    )
}

export default Alerta;