import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";

function NovoPost(props){

    const gerarPost =() => {       
        let data = salvarData();
        props.publicarPost(data);
    }

    const salvarData = () =>{
        const novaData = new Date();

        const ano = formatarData(novaData.getFullYear());
        // getMonth retorna os meses com janeiro sendo 0 e dezembro 11, é necessário adicionar 1 antes de formatar para aparecer o mês correto
        const corrigirMes = novaData.getMonth() + 1
        const mes = formatarData(corrigirMes);
        const dia = formatarData(novaData.getDate());
        const horas = formatarData(novaData.getHours());
        const minutos = formatarData(novaData.getMinutes());
        const segundos = formatarData(novaData.getSeconds());

        const dataAtual = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`

        return dataAtual;
    }

    const formatarData = (numero) => (numero < 10 ? `0${numero}` : numero);
    
    return (
        <div className="criarPost postConfigPadrao bordaGradient">
        <header>
                <BsPersonCircle className='userFoto'></BsPersonCircle>
                <div className="conteudo">
                    <h3>Você</h3>
                    <textarea name="criarTexto" id="criarTexto" cols="min-width" rows="3" placeholder='Crie seu post!'></textarea>
                </div>
        
        </header>
            <footer>
                <button className='publicarPostBtn ' onClick={() =>{gerarPost()}}>Publicar <BiSolidPencil /></button>
            </footer>
        </div>

    )
}


export default NovoPost