import { useState } from "react";
import Plot from "react-plotly.js";
import { saveAs } from "file-saver";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export const Simulation = () => {
  const [simulationsNumber, setSimulationsNumber] = useState(0);
  const [pointsArray, setPointsArray] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate = useNavigate();

  const handleSimulationsNumberChange = (event) => {
    setSimulationsNumber(event.target.value);
  };

  const handleStartSimulation = () => {
    let points = [];
    for (let i = 0; i < simulationsNumber; i++) {
      let diceRoll1 = Math.floor(Math.random() * 6) + 1;
      let coinFlip1 = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
      let diceRoll2 = Math.floor(Math.random() * 6) + 1;
      let coinFlip2 = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
      let point = [diceRoll1 * coinFlip1, diceRoll2 * coinFlip2];
      points.push(point);
    }
    setPointsArray(points);
  };

  const generateReport = () => {
    let report = {};
    pointsArray.forEach((point) => {
      if (report[point]) {
        report[point]++;
      } else {
        report[point] = 1;
      }
    });
    return report;
  };

  const generateHeatmapData = () => {
    let xValues = [];
    let yValues = [];
    let zValues = [];
    for (let x = -6; x <= 6; x++) {
      for (let y = -6; y <= 6; y++) {
        xValues.push(x);
        yValues.push(y);
        zValues.push(generateReport()[[x, y]] || 0);
      }
    }
    return [xValues, yValues, zValues];
  };

  const downloadCSV = () => {
    const csvContent = [
      ["X", "Y", "Frequência", "%"], // Cabeçalho do CSV
      ...Object.keys(generateReport()).map((key) => [
        key.split(",")[0],
        key.split(",")[1],
        generateReport()[key],
        ((generateReport()[key] / pointsArray.length) * 100).toFixed(2),
      ]),
    ].map((row) => row.join(",")); // Transforma cada linha em uma string CSV

    const blob = new Blob([csvContent.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "relatorio.csv"); // Faz o download do arquivo CSV
  };


  return (
    <div className="flex flex-col items-center max-w-full justify-center bg-zinc-700">
      <header className="fixed top-0 left-0 z-10 bg-zinc-900 px-6 py-3 w-full justify-between flex gap-8">
      <div className="flex gap-4 items-center">
        <button 
        className="bg-violet-700 hover:bg-violet-800 transition-colors text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-fit"
        onClick={() => navigate('/')}>
          <ArrowLeft color="white" size={20} />
        </button>
        <h1 className="md:text-2xl xs:text-lg font-bold text-white">
          Simulador Marca Pontos
        </h1>
        </div>
      </header>
      <div className="bg-zinc-800 p-8 mt-20 rounded-lg shadow-lg my-4">
        <div className="mb-4 flex md:flex-row xs:flex-col gap-4 items-center justify-center">
          <label
            htmlFor="simulations-number"
            className="block text-white xs:text-xl md:text-base font-bold mb-2 xs:w-full md:w-fit"
          >
            Número de Simulações:
          </label>
          <input
            type="number"
            id="simulations-number"
            name="simulations-number"
            value={simulationsNumber}
            onChange={handleSimulationsNumberChange}
            className="shadow appearance-none border border-zinc-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-700"
          />
          <button
            onClick={handleStartSimulation}
            className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit"
          >
            Simular
          </button>
        </div>
        {pointsArray.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-white">
              Relatório:
            </h2>
            <div className="flex md:flex-row gap-4 xs:flex-col">
              <div className="grid place-items-center">
                <button
                  onClick={downloadCSV}
                  className="bg-violet-700 hover:bg-violet-800 transition-colors mb-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit"
                >
                  Baixar CSV
                </button>
                <div className="overflow-y-scroll scroll h-96 grid place-items-center py-4">
                  <table className="table-auto">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="px-4 py-2 text-white">X</th>
                        <th className="px-4 py-2 text-white">Y</th>
                        <th className="px-4 py-2 text-white">Frequência</th>
                        <th className="px-4 py-2 text-white">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(generateReport()).map((key) => (
                        <tr key={key}>
                          <td className="border text-center border-zinc-700 px-4 py-2 text-white">
                            {key.split(",")[0]}
                          </td>
                          <td className="border text-center border-zinc-700 px-4 py-2 text-white">
                            {key.split(",")[1]}
                          </td>
                          <td className="border text-center border-zinc-700 px-4 py-2 text-white">
                            {generateReport()[key]}
                          </td>
                          <td className="border text-center border-zinc-700 px-4 py-2 text-white">
                            {String(
                              (
                                (generateReport()[key] / pointsArray.length) *
                                100
                              ).toFixed(2)
                            ).replace(".", ", ")}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-700">
                        <td className="border border-zinc-700 px-4 py-2 text-white font-bold">
                          Total
                        </td>
                        <td className="border border-zinc-700 px-4 py-2 text-white"></td>
                        <td className="border border-zinc-700 px-4 py-2 text-white font-bold">
                          {Object.values(generateReport()).reduce(
                            (acc, curr) => acc + curr,
                            0
                          )}
                        </td>
                        <td className="border border-zinc-700 px-4 py-2 text-white font-bold">
                          100%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden h-fit bg-white">
                <Plot
                  data={[
                    {
                      x: generateHeatmapData()[0],
                      y: generateHeatmapData()[1],
                      z: generateHeatmapData()[2],
                      type: "heatmap",
                      colorscale: "Hot",
                    },
                  ]}
                  layout={{
                    width: width<890? 300 : 500,
                    height: width<890? 300 : 500,
                    title: "Gráfico de frequência",
                    xaxis: {
                      title: "X",
                      range: [-6, 6],
                    },
                    yaxis: {
                      title: "Y",
                      range: [-6, 6],
                    },
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
