

export class Errors {

    // static list
    public static errorList: any[];
  
    constructor() {
  
    }
  
    // add a new error to the static list
    static addError(type: string, description: string, line: number, column: number): void {
      if (Errors.errorList === undefined) {
        Errors.errorList = [];
      }
      const error = {
        type: type,
        description: description,
        line: line,
        column: column
      }
      Errors.errorList.push(error);
    }
    // generate the graphviz of the errors
    static getErrors(): string {
  
      let graphviz: string = "digraph {\n";
      // add the header of the table: Identificador, Tipo, Primitivo,Linea, Columna
      graphviz += "node [shape=plaintext];\n" +
        " table [label=<\n" +
        "<table border=\"0\" cellborder=\"1\" cellspacing=\"0\">\n" +
        "<tr><td>Tipo</td><td>Descripción</td><td>Linea</td><td>Columna</td></tr>\n";
      // end
      // access to the static list of the table symbol
      if (Errors.errorList !== undefined) {
        Errors.errorList.forEach((error: any) => {
          // add the row of the table
          graphviz += "<tr><td>" + error.type + "</td><td>" + error.description + "</td><td>" + error.line + "</td><td>" + error.column + "</td></tr>\n";
          // end
        })
      }
      // end
      graphviz += " </table>\n" +
        ">];\n" +
        "}";
      return graphviz;
    }
    // clean the errors
    static cleanErrors(): void {
      Errors.errorList = [];
    }
  }
  