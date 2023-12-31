 // importar librerias
import { Request, Response } from "express";
import { Context } from "./interpreterSQL/abstract/Context";
import Tree from "./interpreterSQL/tools/Tree";
import { Node } from "./interpreterSQL/abstract/Node";
import { Errors } from "./interpreterSQL/tools/Errors";
import { Symbololo } from "./interpreterSQL/tools/tablasym";


class InterpreteController {
  // metodo ping
  public pong(req: Request, res: Response) {
    res.send("Pong interpreter controller OLC1");
  }

  public getDatos(req: Request, res: Response){
    res.send("Ya estoy hasta la verga")
  }
  // metodo para interpretar el codigo fuente
  public interpretar(req: Request, res: Response) {
    // variable parser
    var parser = require("./interpreterSQL/grammar");
    let tree: Tree | null;
    // variable codigo fuente
    const text = req.body.data;
    Errors.cleanErrors();
    Symbololo.cleanErrors();
    console.log("Codigo de entrada:  " + text);
    let result = ""
    
      // parsear el codigo fuente
      const ast = parser.parse(text); //ast es el arbol de sintaxis abstracta [asignar, declaracion, funcion, dml, ddl]
      tree = new Tree(ast);
        
        const globalContext = new Context(null);
        try{
          for (const inst of ast){
            result += inst.interpret(globalContext);
          }
        }catch{
          result += "Su codigo contiene errores"
          res.json({
            "console": result,
            "ast": "",
            "err": Errors.getErrors()
          })
        }
        

        	
        // res.json({ consola:"ejecutado correctamente", errores: "ninguno" });

      
    
    let rootAST: Node = new Node("Root");
    let value: Node = new Node("Instrucciones");
    for(let item of tree.instructions){
      value.addChildsNode(item.getAST());
    }
    rootAST.addChildsNode(value);
    let asts= tree.getDot(rootAST, false);
    
    
    res.json({
      "console": result,
      "ast": asts,
      "err": Errors.getErrors(),
      "tab": Symbololo.getErrors()
    })


  }

  

  
}

export const interpreteController = new InterpreteController();

