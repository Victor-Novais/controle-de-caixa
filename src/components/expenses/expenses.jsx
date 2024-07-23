import React, { useState, useEffect } from 'react';
import './expenses.css';
import api from '../../service/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Expenses = () => {
    const [despesasPorPeriodo, setDespesasPorPeriodo] = useState({ labels: [], expensesData: [] });

    useEffect(() => {
        const fetchExpensesData = async () => {
            try {
                const response = await api.get('/financeiro/expenses-by-period');
                const { totalExpenses } = response.data;
                const expensesData = totalExpenses.map(item => item.value);
                const labels = totalExpenses.map(item => item.label);

                setDespesasPorPeriodo({ labels, expensesData });
            } catch (error) {
                console.error('Erro ao buscar despesas por período:', error);
            }
        };

        fetchExpensesData();
    }, []);

    const periodoData = {
        labels: despesasPorPeriodo.labels,
        datasets: [
            {
                label: 'Despesas por Período',
                data: despesasPorPeriodo.expensesData,
                backgroundColor: '#B22222',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff',
                },
            },
            y: {
                ticks: {
                    color: '#ffffff',
                },
            },
        },
    };

    return (
        <div className="expenses">
            <h1 className="expenses-title">DESPESAS AO LONGO DO TEMPO</h1>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <Bar data={periodoData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Expenses;