//ESTA ES LA CLASE PRINCIPAL 
import Tree from "../tools/Tree";
import { Context } from "./Context";
import { Node } from "./Node";
export abstract class AbstractSQLExpression {
  //agregar linea y columna seria mas para errores semanticos
  public line: number;    
  public column: number;
  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

    //Metodo abstracto para ejecutar codigo de las clases que van a heredar 
  public abstract interpret(context: Context): any; //Para todas las instrucciones (lo que no devuelve nada)

  public abstract getAST(): Node; //Devuelve structura de su arbol 
}