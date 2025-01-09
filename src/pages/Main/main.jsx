import React, { useEffect, useState } from "react";
import api from "../../service/api";
import Expenses from "../../components/expenses/expenses";
import MainIndicators from "../../components/main-indicators/main-indicators";
import Performed from "../../components/performed/performed";
import SummarizesExpenses from "../../components/summarizes-expenses/summarizes-expenses";
import "./main.css";

export default function Main() {
  const [gastos, setGastos] = useState(0);
  const [saldoVendas, setSaldoVendas] = useState(0);
  const [lucro, setLucro] = useState(0);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const [responseLucro, responseDespesas] = await Promise.all([
          api.get("/compras/lucro-total"),
          api.get("/produtos/despesasTotais"),
        ]);

        setLucro(Number(responseLucro.data.valorTotalCompras ?? 0));
        setGastos(Number(responseDespesas.data.despesasTotais ?? 0));

        setSaldoVendas(Number(responseLucro.data.valorTotalCompras ?? 0));
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    fetchFinancialData();
  }, []);

  const formatarComoMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <div className="main">
        <header>
          <h1 className="title">DESEMPENHO DE ORÇAMENTO</h1>
          <div className="infos-caixa">
            {/* Garantir que os valores são formatados corretamente como moeda */}
            <h1>Gasto: {formatarComoMoeda(gastos)}</h1>
            <h1>Saldo de vendas: {formatarComoMoeda(saldoVendas)}</h1>
          </div>
        </header>
      </div>

      <SummarizesExpenses
        saldoVendas={saldoVendas}
        gastos={gastos}
        lucro={lucro}
      />

      <MainIndicators />
      <Expenses />
      <Performed />
    </>
  );
}
