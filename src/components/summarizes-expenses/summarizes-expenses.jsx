import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './summarizes-expenses.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SummarizesExpenses = () => {
    const [chartData, setChartData] = useState(null);
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
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/financeiro');
                const data = await response.json();
                setChartData({
                    labels: ['Gastos Totais', 'Vendas Totais'],
                    datasets: [
                        {
                            label: 'Valores em Reais',
                            data: [data.totalExpenses, data.totalProfit],
                            backgroundColor: ['#B22222', '#228B22'],
                            borderColor: ['#B22222', '#1E90FF'],
                            borderWidth: 1
                        }
                    ]
                });

            } catch (error) {
                console.error('Erro ao buscar dados financeiros:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="summarizes-expenses">
            <h1>VISÃO GERAL</h1>
            <div className="chart-container-sm">
                {chartData && <Bar data={chartData} options={options} />}
            </div>
        </div>
    );
};

export default SummarizesExpenses;
