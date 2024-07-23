import React, { useEffect, useState } from 'react';
import Expenses from '../../components/expenses/expenses';
import MainIndicators from '../../components/main-indicators/main-indicators';
import Performed from '../../components/performed/performed';
import SummarizesExpenses from '../../components/summarizes-expenses/summarizes-expenses';
import api from '../../service/api';
import './main.css';

export default function Main() {
    const [gastos, setGastos] = useState(0);
    const [saldoVendas, setSaldoVendas] = useState(0);

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                const response = await api.get('/financeiro');
                setGastos(response.data.gastos ?? 0);
                setSaldoVendas(response.data.saldoVendas ?? 0);
            } catch (error) {
                console.error('Erro ao buscar dados financeiros:', error);
            }
        };
        fetchFinancialData();
    }, []);

    return (
        <>
            <div className="main">
                <header>
                    <h1 className="title">PERFORMANCE DE ORÇAMENTO</h1>
                    <div className="infos-caixa">
                        <h1>Gasto: R$ {gastos.toFixed(2)}</h1>
                        <h1>Saldo de vendas: R$ {saldoVendas.toFixed(2)}</h1>
                    </div>
                </header>
            </div>
            <MainIndicators />
            <Expenses />
            <SummarizesExpenses />
            <Performed />
        </>
    );
}