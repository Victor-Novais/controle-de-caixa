import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./summarizes-expenses.css";
import api from "../../service/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SummarizesExpenses = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          color: "#ffffff",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lucroResponse = await api.get("/compras/lucro-periodo");
        const totalLucro = lucroResponse.data.reduce(
          (acc, item) => acc + item.valorTotal,
          0
        );

        const despesasResponse = await api.get(
          "/financeiro/expenses-by-period"
        );
        const totalDespesas = despesasResponse.data.totalExpenses.reduce(
          (acc, item) => acc + item.value,
          0
        );

        setChartData({
          labels: ["Vendas Totais", "Despesas Totais"],
          datasets: [
            {
              label: "Valores em Reais",
              data: [totalLucro, totalDespesas],
              backgroundColor: ["#228B22", "#B22222"],
              borderColor: ["#1E90FF", "#B22222"],
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

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
