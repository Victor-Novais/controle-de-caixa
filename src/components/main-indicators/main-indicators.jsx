import "./main-indicators.css";
import { useState, useEffect } from "react";
import api from "../../service/api";
import { Bar } from "react-chartjs-2";
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

const MainIndicators = () => {
  const [lucroPorPeriodo, setLucroPorPeriodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/compras/lucro-periodo")
      .then((response) => {
        setLucroPorPeriodo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar lucro por período:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  const formatarData = (data) => {
    const options = { year: "numeric", month: "long" };
    return new Date(data).toLocaleDateString("pt-BR", options);
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const periodoData = {
    labels: lucroPorPeriodo.map((item) => formatarData(item.periodo)),
    datasets: [
      {
        label: "Lucro por Período",
        data: lucroPorPeriodo.map((item) => item.lucro),
        backgroundColor: "#228B22",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#ffffff" } },
      y: { ticks: { color: "#ffffff" } },
    },
  };

  return (
    <div className="main-container">
      <h1>LUCRO AO LONGO DO TEMPO</h1>
      <div className="chart-container-vendas">
        <div className="chart-wrapper-vendas">
          <Bar data={periodoData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MainIndicators;
