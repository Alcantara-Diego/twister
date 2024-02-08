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

export default salvarData;