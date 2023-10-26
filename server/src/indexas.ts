let dot  = "C:/Program Files/Graphviz/bin/dot"
let entrada = "./server/src/controllers/interpreterSQL/tools/grafo.dot"
let salida = "./server/src/controllers/interpreterSQL/tools/ast.svg"

const { exec } = require('child_process');


function generarAst(){
  let comando = `${dot} -Tsvg ${entrada} -o ${salida}`
  exec(comando, (error: any, stdout: any, stderr: any) => {
    if(error){
      console.error(`Error al ejecutar el comando: ${error.message}`);
      return;
    }
    console.log(`El archivo ${salida} se ha generado correctamente`);
  })
}