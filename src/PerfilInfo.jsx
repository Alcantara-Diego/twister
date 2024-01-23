import "./style/perfilInfo.scss"
import { BsPersonCircle } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";


function PerfilInfo(){
    return (
        <div id="telaPerfilInfo">
            <header className="perfilInfoPrincipal">
                <BsPersonCircle className="foto"></BsPersonCircle>
                <h1>Nome de usuário</h1>
                

                <p id="meuRecado">Dono de tudo, se eu não gostar eu mudo</p>

                <button className="bordaGradient">Editar
                </button>
            </header>
            

            <ul className="dados">
                <div className="seguidores">
                    <li>
                        <p>Seguidores <span className="dadosContagem">30</span></p>
                    </li>
                    <li>
                        <p>Seguindo <span className="dadosContagem">15</span></p>
                    </li>
                </div>

                <li>
                    <p>Conta criada em <span className="dadosContagem">20/01/2024</span></p>
                </li>
            </ul>

            <div className="perfilPosts">
                <h3>Seus posts</h3>
                
            <div className="post postConfigPadrao">
                <BsPersonCircle className='userFoto'></BsPersonCircle>
                <header className="conteudo">
                    <span className='linha1'>
                    <h3 className='userName'>User033</h3>

                    
                    <p className='data'>21/01/2024</p>
                    </span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos inventore, cum in doloribus eveniet! Autem, adipisci.</p>

                </header>
                <footer>
                    
                    <button>
                        <FaRegTrashCan />
                    </button>
                </footer>
                            
                        
            </div>
            </div>


        </div>
    )
}

export default PerfilInfo