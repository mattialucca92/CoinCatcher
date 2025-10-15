import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

const Transaction = ({ transazioni, setTransazioni }) => {
  // FILTRI
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroDataDa, setFiltroDataDa] = useState(null);
  const [filtroDataA, setFiltroDataA] = useState(null);

  const categorieUniche = [
    "🍔 Cibo",
    "🏠 Affitto",
    "💰 Stipendio",
    "🎉 Spese Extra",
    "🚌 Trasporti",
    "🎵 Intrattenimento",
  ];

  // FILTRO TRANSAZIONI
  const transazioniFiltrate = transazioni.filter((t) => {
    const matchTipo = filtroTipo ? t.tipo === filtroTipo : true;
    const matchCategoria = filtroCategoria
      ? t.categoria === filtroCategoria
      : true;

    let matchData = true;
    if (filtroDataDa)
      matchData = matchData && t.data >= format(filtroDataDa, "yyyy-MM-dd");
    if (filtroDataA)
      matchData = matchData && t.data <= format(filtroDataA, "yyyy-MM-dd");

    return matchTipo && matchCategoria && matchData;
  });

  // RESET FILTRI
  const resetFiltri = () => {
    setFiltroTipo("");
    setFiltroCategoria("");
    setFiltroDataDa(null);
    setFiltroDataA(null);
  };

  // FORM
  const [formData, setFormData] = useState({
    tipo: "entrata",
    importo: "",
    categoria: "",
    descrizione: "",
    data: null,
    id: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, data: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.importo || !formData.categoria || !formData.data) return;

    const nuovaTransazione = {
      id: formData.id || Date.now(),
      tipo: formData.tipo,
      importo: Number(formData.importo),
      categoria: formData.categoria,
      descrizione: formData.descrizione,
      data: format(formData.data, "yyyy-MM-dd"),
    };

    if (formData.id) {
      setTransazioni(
        transazioni.map((t) => (t.id === formData.id ? nuovaTransazione : t))
      );
    } else {
      setTransazioni([nuovaTransazione, ...transazioni]);
    }

    setFormData({
      tipo: "entrata",
      importo: "",
      categoria: "",
      descrizione: "",
      data: null,
      id: null,
    });
  };

  const handleEdit = (t) => {
    setFormData({
      tipo: t.tipo,
      importo: t.importo,
      categoria: t.categoria,
      descrizione: t.descrizione,
      data: parseISO(t.data),
      id: t.id,
    });
  };

  const handleDelete = (id) => {
    setTransazioni(transazioni.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-6">
      {/* FILTRI */}
      <div className="bg-[#2C3E50] p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row gap-4">
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="p-2 rounded bg-[#374151] text-white"
        >
          <option value="">Tutti i tipi</option>
          <option value="entrata">Entrata</option>
          <option value="uscita">Uscita</option>
        </select>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="p-2 rounded bg-[#374151] text-white"
        >
          <option value="">Seleziona categoria 🎯</option>
          {categorieUniche.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <DatePicker
          selected={filtroDataDa}
          onChange={setFiltroDataDa}
          dateFormat="dd-MM-yyyy"
          placeholderText="Da"
          className="p-2 rounded bg-[#374151] text-white"
        />

        <DatePicker
          selected={filtroDataA}
          onChange={setFiltroDataA}
          dateFormat="dd-MM-yyyy"
          placeholderText="A"
          className="p-2 rounded bg-[#374151] text-white"
        />

        <button
          onClick={resetFiltri}
          className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Reset Filtri
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LISTA TRANSNAZIONI */}
        <div className="relative w-full md:w-1/2 space-y-4">
          {transazioniFiltrate.map((t) => (
            <div
              key={t.id}
              className="relative p-4 rounded-lg shadow-md flex justify-between items-center bg-[#2C3E50] hover:bg-[#374151] transition-colors"
            >
              <div>
                <p
                  className={`font-bold ${
                    t.tipo === "entrata" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {t.tipo.toUpperCase()} - {t.importo}€
                </p>
                <p className="text-white">
                  {t.categoria} - {t.descrizione}
                </p>
                <p className="text-gray-300 text-sm">{t.data}</p>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                    onClick={() => handleDelete(t.id)}
                  >
                    🗑️
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-300 text-gray-900"
                    onClick={() => handleEdit(t)}
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="bg-[#2C3E50] p-6 rounded-lg shadow-md">
            <h2 className="text-white text-xl font-bold mb-4">
              Aggiungi Transazione
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white font-medium">Tipo:</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded-md bg-[#374151] text-white"
                >
                  <option value="entrata">Entrata</option>
                  <option value="uscita">Uscita</option>
                </select>
              </div>

              <div>
                <label className="text-white font-medium">Importo:</label>
                <input
                  type="number"
                  name="importo"
                  value={formData.importo}
                  onChange={handleChange}
                  placeholder="Digita una cifra"
                  className="w-full mt-1 p-2 rounded-md bg-[#374151] text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="text-white font-medium">Categoria:</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {categorieUniche.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`px-3 py-1 rounded-md ${
                        formData.categoria === cat
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-[#374151] text-white"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, categoria: cat })
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white font-medium">Descrizione:</label>
                <input
                  type="text"
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleChange}
                  placeholder="Causale"
                  className="w-full mt-1 p-2 rounded-md bg-[#374151] text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="text-white font-medium">Data:</label>
                <DatePicker
                  selected={formData.data}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Seleziona una data"
                  className="w-full p-2 rounded-md bg-[#374151] text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Salva Transazione
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
