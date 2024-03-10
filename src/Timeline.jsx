import "./style/listaEditavel.scss"
import VoltarTela from "./VoltarTela";
import { ImNewspaper } from "react-icons/im";
import { GiTwister } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { MdAddReaction } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { AuthGoogleContext } from "./contexts/AuthGoogle";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


function Timeline(props){

    const notificacaoModelo = {
        tipo: "notificacao",
        origem: "comentario",
        titulo: `usuario comentou em seu post`,
        foto: "comentarioObj.fotoURL",
        conteudo: "comentarioObj.texto",
        data: "comentarioObj.data",
        link: `/`


    }

    const { usuarioLogado } = useContext(AuthGoogleContext);

    const navigate = useNavigate();

    const [notificacoes, setNotificacoes] = useState([])


    useEffect(()=>{
        console.log(usuarioLogado)
        usuarioLogado !== null &&
        setNotificacoes(usuarioLogado.notificacoes);

    }, [usuarioLogado])


    useEffect(()=>{
        console.log(notificacoes)
    }, [notificacoes])

    return (
        <div id="timeline">

            <VoltarTela 
            funcao={"home"}
            setaId={"fecharTimeline"}>
            </VoltarTela>
            

            <ul className="timelineLista">
                <h2> Notificações
                </h2>


              

                {notificacoes? notificacoes.map((item, index) => (
                     <li key={index} className="itemLista">
                     <div className="info">
                         {/* <BsPersonCircle className="icone"/> */}
                         <img src={item.foto} alt="" className="fotoDePerfil"/>
                         <div className="principal">
                             
                             <h4>{item.titulo}</h4>
                             
                             <p className="secundario">{item.data.data}</p>
 
                         </div>
                     </div>
 
                     {item.link? (

                        <button className="bordaGradient" onClick={() => { navigate(item.link) }}>
                            Abrir
                        </button>

                    ) : <ImNewspaper className="novidade"/>}
                 </li>
                )): null}


                <li className="itemLista">aaa
                    <div className="info">
                        <MdHealthAndSafety className="icone"/>
                        <div className="principal">
                            
                            <h4>Corrigido bug no feed</h4>
                            <p>01/03/2024</p>

                        </div>
                    </div>

                    <ImNewspaper className="novidade"/>
                </li>
            
                <li className="itemLista">
                    <div className="info">
                        <MdAddReaction className="icone"/>
                        <div className="principal">
                            
                            <h4>Adicionado notificações no app</h4>
                            <p>01/03/2024</p>

                        </div>
                    </div>

                    <ImNewspaper className="novidade"/>
                </li>


                <li className="itemLista">
                    <div className="info">
                        <BsPersonCircle className="icone"/>
                        <div className="principal">
                            
                            <h4>@user123 criou uma conta no twister</h4>
                            
                            <p className="secundario">01/03/2024</p>

                        </div>
                    </div>

                    <button className="bordaGradient">Abrir</button>
                </li>



                <li className="itemLista">
                    <div className="info">
                        <BsPersonCircle className="icone"/>
                        <div className="principal">
                            
                            <h4>@userteste comentou em seu post</h4>
                            
                            <p className="secundario">01/03/2024</p>

                        </div>
                    </div>

                    <button className="bordaGradient">Abrir</button>
                </li>

                

                

                <li className="itemLista">
                    <div className="info">
                        <GiTwister className="icone"/>
                        <div className="principal">
                            
                            <h4>Twister versão alpha sendo lançada</h4>
                            <p>01/03/2024</p>

                        </div>
                    </div>

                    <ImNewspaper className="novidade"/>
                </li>

                <li className="itemLista">
                    <div className="info">
                        <BsPersonCircle className="icone"/>
                        <div className="principal">
                            
                            <h4>@userteste passou a te seguir</h4>
                            
                            <p className="secundario">01/03/2024</p>

                        </div>


                    </div>

                    <button className="bordaGradient">Abrir</button>
                </li>
            </ul>
           
                

                
               
            
            
        
        </div>
    )
}

export default Timeline;