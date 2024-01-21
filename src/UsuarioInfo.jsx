import "./style/usuarioInfo.scss"
import { BsPersonCircle } from "react-icons/bs";
function UsuarioInfo(){
    return (
        <div id="telaUsuarioInfo">
            <div className="usuarioInfoPrincipal">
                <BsPersonCircle className="foto"></BsPersonCircle>
                <p>Nome de usuário</p>
            </div>

            <div className="dados">
                <p>Seguidores: <strong>5</strong></p>
                <p className="divisao">Seguindo: <strong>5</strong></p>
                
                <p>Posts criados: <strong>5</strong></p>

                <p className="divisao">Posts curtidos: <strong>5</strong></p>

                <p >Conta criada em: <strong>20/01/2023</strong></p>
            </div>
        </div>
    )
}

export default UsuarioInfo