// GraphvizGenerator.tsx
import React, { useState } from 'react';
import QuickChart from 'quickchart-js';

function GraphvizGenerator() {
  const [dotContent, setDotContent] = useState(`
    digraph G {
      A -> B;
      B -> C;
    }
  `);

  const generateGraph = () => {
    const chart = new QuickChart();
    chart
      .setConfig({
        type: 'gv',
        data: dotContent,
      })
      .setWidth(400)
      .setHeight(300);

    // Obtén el enlace directo al gráfico
    const chartUrl = chart.getUrl();

    // Crea un enlace de descarga para el archivo .dot
    const dotBlob = new Blob([dotContent], { type: 'text/plain' });
    const dotUrl = URL.createObjectURL(dotBlob);

    // Crea un elemento de anclaje invisible para la descarga del archivo .dot
    const dotLink = document.createElement('a');
    dotLink.href = dotUrl;
    dotLink.download = 'graph.dot';

    // Simula un clic en el enlace de descarga
    dotLink.click();
  };

  return (
    <div>
      <button onClick={generateGraph}>Generar y Descargar Gráfico</button>
    </div>
  );
}

export default GraphvizGenerator;
