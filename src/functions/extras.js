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



window.addEventListener("resize", ajustarNavegacao);

// Evitar que a sidebarmobile não fique visivel devido a url do celular ocupar espaço da tela
function ajustarNavegacao(){
    const alturaJanela = window.innerHeight;
    const larguraJanela = window.innerWidth

    const alturaURL = document.documentElement.clientHeight - alturaJanela;

    // 700 é a largura máxima que a sidebarmobile é exibida 
    if (larguraJanela < 700) {
        document.getElementsByClassName("sidebar")[0].style.bottom=alturaURL+"px"

        
    }


    console.log(larguraJanela)
}

export  {salvarData, temporizador, ajustarNavegacao};
