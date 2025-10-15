import { useState } from "react";
import { CgLaptop } from "react-icons/cg";
import DatePicker from "react-datepicker"; // IMPORT obbligatorio
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const Transaction = ({ transazioni, setTransazioni }) => {
  //INIZIALIZZO GLI STATE CHE MI SERVONO PER I FILTRI
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroDataDa, setFiltroDataDa] = useState("");
  const [filtroDataA, setFiltroDataA] = useState("");

    

  const categorieUniche = [
    "🍔 Cibo",
    "🏠 Affitto",
    "💰 Stipendio",
    "🎉 Spese Extra",
    "🚌 Trasporti",
    "🎵 Intrattenimento",
  ];
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("");


  

  const transazioniFiltrate = transazioni.filter((t) => {
    const matchTipo = filtroTipo ? t.tipo === filtroTipo : true;
    const matchCategoria = filtroCategoria
      ? t.categoria === filtroCategoria
      : true;

    let matchData = true;
    if (filtroDataDa) matchData = matchData && t.data >= filtroDataDa;
    if (filtroDataA) matchData = matchData && t.data <= filtroDataA;

    return matchTipo && matchCategoria && matchData;
  });

  // INIZIALIZZO UNO STATE PER IL FORM
  const [formData, setFormData] = useState({
    tipo: "entrata",
    importo: "",
    categoria: "",
    descrizione: "",
    data: "",
  });

  // helper per convertire stringa YYYY-MM-DD -> Date o null
  const parseDateString = (s) => (s ? new Date(s + "T00:00:00") : null);

  // handler per react-datepicker (riceve un Date o null)
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      data: date ? format(date, "yyyy-MM-dd") : "",
    }));
  };

  // ALL'INVIO DEL FORM , PREVENGO IL DEFAULT E CREO UN NUOVO OGGETTO CONTENENTE TUTTE LE INFORMAZIONI SCRITTE NEL FORM + RESET DEL FORM ALL'INVIO
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuovaTransazione = {
      id: Date.now(),
      tipo: formData.tipo,
      importo: Number(formData.importo),
      categoria: formData.categoria, // <- qui prendi formData
      descrizione: formData.descrizione,
      data: formData.data,
    };

    if (formData.id) {
      setTransazioni(
        transazioni.map((t) =>
          t.id === formData.id ? { ...formData, id: t.id } : t
        )
      );
    } else {
      setTransazioni([nuovaTransazione, ...transazioni]);
    }

    setFormData({
      tipo: "entrata",
      importo: "",
      categoria: "",
      descrizione: "",
      data: "",
    });
  };


  // IMPLEMENTO IL PULSANTE MODIFICA/EDIT
  const handleEdit = (t) => {
    setFormData({
      tipo: t.tipo,
      importo: t.importo,
      categoria: t.categoria,
      descrizione: t.descrizione,
      data: t.data,
      id: t.id, // utile per sapere quale modificare
    });
  };

  // IMPLEMENTO IL PULSANTE ELIMINA
  const handleDelete = (id) => {
    setTransazioni(transazioni.filter((t) => t.id !== id));
  };

  // CATTURO OGNI CAMBIAMENTO NEL FORM + COPIO TUTTI I DATI PRECEDENTI (...FORMDATA) + AGGIORNO SOLO IL CAMPO SPECIFICO ([e.target.name]: e.target.value)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-6">
      {/* RENDERING DEL FILTRO */}
      <div className="bg-[#2C3E50] p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row gap-4">
        {/* Tipo */}
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="p-2 rounded bg-[#374151] text-white"
        >
          <option className="font-Quicksand" value="">
            Tutti i tipi
          </option>
          <option className="font-Quicksand" value="entrata">
            Entrata
          </option>
          <option className="font-Quicksand" value="uscita">
            Uscita
          </option>
        </select>

        {/* Categoria */}
        <select
          value={categoriaSelezionata}
          onChange={(e) => setCategoriaSelezionata(e.target.value)}
        >
          <option value="">Seleziona categoria 🎯</option>
          {categorieUniche.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Data Da */}
        <div>
          <label className="text-white font-medium">Da:</label>
          <div className="flex items-center bg-[#374151] rounded-md p-1 mt-1">
            <DatePicker
              selected={
                filtroDataDa ? new Date(filtroDataDa + "T00:00:00") : null
              }
              onChange={(date) =>
                setFiltroDataDa(date ? format(date, "yyyy-MM-dd") : "")
              }
              dateFormat="dd-MM-yyyy"
              placeholderText="gg-mm-aaaa"
              className="w-full p-2 bg-transparent text-white outline-none cursor-pointer"
            />
            <span className="ml-2 pr-2 text-gray-300 select-none">📅</span>
          </div>
        </div>

        {/* Data A */}
        <div>
          <label className="text-white font-medium">A:</label>
          <div className="flex items-center bg-[#374151] rounded-md p-1 mt-1">
            <DatePicker
              selected={
                filtroDataA ? new Date(filtroDataA + "T00:00:00") : null
              }
              onChange={(date) =>
                setFiltroDataA(date ? format(date, "yyyy-MM-dd") : "")
              }
              dateFormat="dd-MM-yyyy"
              placeholderText="gg-mm-aaaa"
              className="w-full p-2 bg-transparent text-white outline-none cursor-pointer"
            />
            <span className="ml-2 pr-2 text-gray-300 select-none">📅</span>
          </div>
        </div>
        <button
          onClick={() => {
            setFiltroTipo("");
            setFiltroCategoria("");
            setFiltroDataDa("");
            setFiltroDataA("");
          }}
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
              className="relative p-4 rounded-lg shadow-md flex justify-between items-center
                        bg-[#2C3E50] hover:bg-[#374151] transition-colors"
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

        {/* FORM + ANTEPRIMA */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* FORM */}
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
                        setFormData((prev) => ({ ...prev, categoria: cat }))
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
                <div className="relative mt-1">
                  <div className="flex items-center bg-[#374151] rounded-md p-1">
                    <DatePicker
                      selected={parseDateString(formData.data)}
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Seleziona una data"
                      className="w-full p-2 bg-transparent text-white outline-none cursor-pointer"
                      popperClassName="react-datepicker-popper"
                      calendarClassName="react-datepicker-calendar"
                    />
                    {/* icona calendario a destra */}
                    <span className="ml-2 pr-2 text-gray-300 select-none">
                      📅
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Aggiungi Transazione
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
