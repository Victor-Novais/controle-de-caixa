import './main-indicators.css';
import { useState, useEffect } from 'react';
import api from '../../service/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainIndicators = () => {
    const [vendasPorPeriodo, setVendasPorPeriodo] = useState([]);

    useEffect(() => {
        api.get('/relatorios/vendas/periodo')
            .then(response => setVendasPorPeriodo(response.data))
            .catch(error => console.error('Erro ao buscar vendas por período:', error));
    }, []);

    const periodoData = {
        labels: vendasPorPeriodo.map(item => item.periodo),
        datasets: [
            {
                label: 'Vendas por Período',
                data: vendasPorPeriodo.map(item => item.total),
                backgroundColor: '#228B22',
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
        <div className="main-container">
            <h1>VENDAS AO LONGO DO TEMPO</h1>
            <div className="chart-container-vendas">
                <div className="chart-wrapper-vendas">
                    <Bar data={periodoData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default MainIndicators;
