const calcularMelhorMesVendas = (compras) => {
    if (!compras || compras.length === 0) {
        return 'Sem dados suficientes';
    }

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let vendasPorMes = {};

    compras.forEach(compra => {
        const mes = new Date(compra.dataHoraCompra).getMonth();
        if (vendasPorMes[meses[mes]]) {
            vendasPorMes[meses[mes]] += parseFloat(compra.valorCompra);
        } else {
            vendasPorMes[meses[mes]] = parseFloat(compra.valorCompra);
        }
    });

    let melhorMes = 'Janeiro';
    let maiorVenda = 0;

    for (const mes in vendasPorMes) {
        if (vendasPorMes[mes] > maiorVenda) {
            maiorVenda = vendasPorMes[mes];
            melhorMes = mes;
        }
    }

    return melhorMes;
};

const calcularVariacaoOrcamentoAnoAnterior = (orcamentoAtual) => {
    const orcamentoAnoAnterior = orcamentoAtual * 0.9;
    const variacao = ((orcamentoAtual - orcamentoAnoAnterior) / orcamentoAnoAnterior) * 100;
    return `${variacao.toFixed(2)}%`;
};

const calcularVariacaoVendasAnoAnterior = (saldoVendasAtual) => {
    const saldoVendasAnoAnterior = saldoVendasAtual * 0.85;
    const variacao = ((saldoVendasAtual - saldoVendasAnoAnterior) / saldoVendasAnoAnterior) * 100;
    return `${variacao.toFixed(2)}%`;
};

const calcularVariacaoSaldoAnoAnterior = (saldoAtual) => {
    const saldoAnoAnterior = saldoAtual * 0.95;
    const variacao = ((saldoAtual - saldoAnoAnterior) / saldoAnoAnterior) * 100;
    return `${variacao.toFixed(2)}%`;
};

module.exports = {
    calcularMelhorMesVendas,
    calcularVariacaoOrcamentoAnoAnterior,
    calcularVariacaoVendasAnoAnterior,
    calcularVariacaoSaldoAnoAnterior
};
