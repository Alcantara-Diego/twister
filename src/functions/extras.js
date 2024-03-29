const salvarData = () =>{
    const novaData = new Date();

    let ano = formatarData(novaData.getFullYear());
    // getMonth retorna os meses com janeiro sendo 0 e dezembro 11, é necessário adicionar 1 antes de formatar para aparecer o mês correto
    const corrigirMes = novaData.getMonth() + 1
    const mes = formatarData(corrigirMes);
    const dia = formatarData(novaData.getDate());
    const horas = formatarData(novaData.getHours());
    const minutos = formatarData(novaData.getMinutes());
    const segundos = formatarData(novaData.getSeconds());

    // 10 no final da funcao é o sistema decimal
    const criacao = parseInt(`${ano}${mes}${dia}${horas}${minutos}${segundos}`, 10);

    const dataAtual = {
        data :`${dia}/${mes}/${ano}`, 
        hora: `${horas}:${minutos}:${segundos}`,
        criacao: criacao,
    
    }

    return dataAtual;
}

const formatarData = (numero) => (numero < 10 ? `0${numero}` : numero);


// Executar uma determinada funcao depois de zerar o tempo
function temporizador(tempo, func){

    let segundos = 0;

    const timer = setInterval(() => {

        segundos++;

        if (segundos > tempo) {
            clearInterval(timer); 
            console.log(`Acionando funcao após ${tempo} segundos`);

            func();
        }
        
    }, 1000);
}

function exibirFeedback(tipo){

    const feedbackErro = document.getElementById("feedbackErro");
    const feedbackSucesso = document.getElementById("feedbackSucesso");

    // Remover a animacao se estiver ativa para reinicia-la
    feedbackSucesso.classList.remove("fade");
    feedbackErro.classList.remove("fade");
    // Trigger reflow to restart the animation
    void feedbackSucesso.offsetWidth;
    void feedbackErro.offsetWidth;


    switch (tipo) {
        case "erro":
            // Iniciar animacao
            feedbackErro.classList.add("fade");
            break;

        case "sucesso":
            feedbackSucesso.classList.add("fade");
        default:
            break;
    }

  

    
}


export  {salvarData, temporizador, exibirFeedback};
