import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = ({ transazioni }) => {
  //FILTRO PER IL TIPO DI TRANSAZIONE + CALCOLO DELLA SOMMA DI TUTTI I VALORI DELLA PROPRIETA IMPORTO + CALCOLO DEL SALDO TOTALE
  const entrate = transazioni
    .filter((t) => t.tipo === "entrata")
    .reduce((total, t) => total + t.importo, 0);

  const uscite = transazioni
    .filter((t) => t.tipo === "uscita")
    .reduce((total, t) => total + t.importo, 0);

  const saldoTotale = entrate - uscite;

  // Prepariamo i dati per il grafico
  const data = {
    labels: ["Entrate", "Uscite"],
    datasets: [
      {
        label: "Transazioni",
        data: [entrate, uscite],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // verde con trasparenza
          "rgba(239, 68, 68, 0.8)", // rosso con trasparenza
        ],
        hoverOffset: 15,
        borderWidth: 3,
        borderColor: "#1E293B",
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#F9F7F2", font: { size: 14, weight: "bold" } },
      },
      title: {
        display: true,
        text: "Distribuzione Entrate e Uscite",
        color: "#F9F7F2",
        font: { size: 20, weight: "bold" },
      },
    },
  };

  return (
    <>
      <div className=" bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Saldo Totale */}
            <div className="bg-[#2C3E50] text-white p-6 rounded-xl shadow-md flex flex-col items-center stat-card">
              <FaWallet size={32} className="mb-2" />
              <p className="text-sm">Saldo Totale</p>
              <p className="text-2xl font-bold mt-2">€ {saldoTotale}</p>
            </div>

            {/* Entrate */}
            <div className="bg-[#10B981] text-white p-6 rounded-xl shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
              <FaArrowDown size={32} className="mb-2" />
              <p className="text-sm">Entrate</p>
              <p className="text-2xl font-bold mt-2">€ {entrate}</p>
            </div>

            {/* Uscite */}
            <div className="bg-[#EF4444] text-white p-6 rounded-xl shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
              <FaArrowUp size={32} className="mb-2" />

              <p className="text-sm">Uscite</p>
              <p className="text-2xl font-bold mt-2">€ {uscite}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#1E293B] to-[#2C3E50] p-8 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto">
        <Pie data={data} options={options} />
      </div>
    </>
  );
};

export default Dashboard;
