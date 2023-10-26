import React, { useEffect, useRef } from 'react';
import Viz from '../../node_modules/viz.js';
import { Module, render } from 'viz.js/full.render.js';

interface GraphRendererProps {
  dotContent: string;
}

const GraphRenderer: React.FC<GraphRendererProps> = ({ dotContent }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderGraph = async () => {
      const viz = new Viz({ Module, render });
      const svgElement = await viz.renderString(dotContent);

      if (containerRef.current && svgElement) {
        containerRef.current.innerHTML = svgElement;
      }
    };

    renderGraph();
  }, [dotContent]);

  return (
    <div ref={containerRef} />
  );
};

export default GraphRenderer;
