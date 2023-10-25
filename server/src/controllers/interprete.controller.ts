 // importar librerias
import { Request, Response } from "express";
import { Context } from "./interpreterSQL/abstract/Context";

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

    // variable codigo fuente
    const text = req.body.data;
    console.log("Codigo de entrada:  " + text);
    let result = ""
    try {
      // parsear el codigo fuente
      const ast = parser.parse(text); //ast es el arbol de sintaxis abstracta [asignar, declaracion, funcion, dml, ddl]
      try {
        const globalContext = new Context(null);
        for (const inst of ast){
          result += inst.interpret(globalContext);
        }

        	res.send(result);
        // res.json({ consola:"ejecutado correctamente", errores: "ninguno" });

      } catch (error) {
        console.log("este -> "+error);
        res.json({
          consola: error,
          errores: error,
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        consola: err,
        errores: err,
      });
    }
  }
}

export const interpreteController = new InterpreteController();