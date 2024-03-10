import './style/cadastro.scss'
import './style/nav.scss'
import { useEffect, useState, useContext } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import { GiTwister } from "react-icons/gi";
import { buscarUsuarioPorIdentificador } from './pastaFirebase/getData';
import {exibirFeedback, salvarData} from './functions/extras';
import { addUsuario } from './pastaFirebase/addData';
import { useNavigate } from 'react-router-dom';
import { gerarComunicado } from './functions/notificacoes';

function Cadastro(){

    const { userAuth, setMensagemAlerta } = useContext(AuthGoogleContext);
    const navigate = useNavigate();


    const [inputValor, setInputValor] = useState("");
    const [feedback, setFeedback] = useState("");



    const avaliarUsername = async () => {

        // Fltrar os caracteres e remover não desejados
        let regexValidado = avaliarRegex();

        if(!inputValor.length || inputValor.length < 8 || inputValor.length > 16){

            setFeedback("Seu username deve conter no mínimo 8 caracteres e no máximo 16");

        } else if (regexValidado){

            // Após filtrar os caracteres permitidos, verificar se o username já está em uso na db
            setFeedback("")
            console.log("entrando na db")
            const buscaNaDb = await buscarUsuarioPorIdentificador("username", inputValor, true);

            console.log(buscaNaDb)

            buscaNaDb === null? criarNovoUsuario(inputValor) : setFeedback(`Username ${inputValor} já está em uso por outro usuário.`)

        }

    }

    function avaliarRegex(){
        // Expressão regular que permite apenas letras minúsculas, números e no máximo um underscore
        const regex = /^[a-z0-9]+(?:_[a-z0-9]+)?$/;

        const validarRegex = regex.test(inputValor);

        if (!validarRegex) {

            // Expressão regular que corresponde a todos os underscores na string
            const regexUnderscore = /_/g;

            // Encontrar todos os underscores na string
            const underscoresEncontrados = inputValor.match(regexUnderscore);

            underscoresEncontrados?.length > 1 ? setFeedback("Não é permitido mais de um undescore _") : setFeedback("Não é permitido underscore _ no começo, ou final do username");

            return false
        }

        return true
    }

    function filtrarCaracteres(valor){

        const regexComplementar = /[^a-z0-9_]|(_[^a-z0-9_]+)?/g;

        const valorFiltrado = valor.replace(regexComplementar, '');

        let input = document.getElementById("cadastrarUsernameInput")
            
        input.value=valorFiltrado;
        setInputValor(valorFiltrado);

    }
   

    async function criarNovoUsuario(username){

        let data = salvarData();

        let novoUsuario = {

            username: `@${username}`,
            displayName: userAuth.displayName,
            email: userAuth.email,
            fotoURL: userAuth.photoURL,
            cadastro: data,
            recado: "Twister social media",
            seguidores: [],
            seguindo: [],
            notificacoes: []


        }

        let user = await addUsuario(novoUsuario);
        console.log(user);

        if (user == "sucesso") {
            // Enviar mensagem de feedback
            setMensagemAlerta("Usuário criado com sucesso. Faça login para acessa-lo");
            exibirFeedback("sucesso");

            // Notificar outros usuários do novo cadastro
            gerarComunicado("novoUsuario", novoUsuario);

            navigate("/");
        } else {

            setMensagemAlerta("Erro ao criar usuário, tente novamente");
            exibirFeedback("erro");

            navigate("/");
        }
        

    }


    return (
    <div className="cadastroDiv centralizar">

        <div className="cadastroConteudo centralizar">

            <h1 className="logo bordaGradient">
                
                <span className="titulo">TWISTER</span>
                <GiTwister className='icone' />

             </h1>

            <div className="cadastroInfoDiv">
                <div className="instrucoes">
                    <h2>Falta apenas mais um passo...</h2>
                    <p>Agora crie seu username para ser possível te encontrarem por aqui.</p>

                    <ul>
                        <li>No mínimo 8 letras</li>
                        <li>Espaços não são permitidos</li>
                        <li>!@#$%¨¨&*()+ não são aceitos</li>
                        <li>Apenas um _ "underscore" é permitido</li>
                        <li>_ "underscore" não deve estar no início ou final do username</li>
                    </ul>
                </div>

                <div className="inputDiv">
                    <span className='centralizar'>@</span>
                    <input type="text" id="cadastrarUsernameInput" name="cadastrarUsernameInput"
                    onChange={(e) => {filtrarCaracteres(e.target.value)}}/>
                    <button onClick={avaliarUsername}>Criar!</button>
                </div>

                <p className='feedback'>{feedback}</p>
            </div>


        </div>

    </div>
    )
}


export default Cadastro;