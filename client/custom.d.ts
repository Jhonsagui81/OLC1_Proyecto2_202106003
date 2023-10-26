declare module 'viz.js/full.render.js' {
    const render: (dot: string, options?: { format: string }) => Promise<string>;
    export { render };
  }
  