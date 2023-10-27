

export class Symbololo {

    // static list
    public static errorList: any[];
  
    constructor() {
  
    }
  
    // add a new error to the static list
    static addError(type: string, description: string, line: number, column: number): void {
      if (Symbololo.errorList === undefined) {
        Symbololo.errorList = [];
      }
      const error = {
        type: type,
        description: description,
        line: line,
        column: column
      }
      Symbololo.errorList.push(error);
    }
    // generate the graphviz of the errors
    static getErrors(): string {
  
      let graphviz: string = "digraph {\n";
      // add the header of the table: Identificador, Tipo, Primitivo,Linea, Columna
      graphviz += "node [shape=plaintext];\n" +
        " table [label=<\n" +
        "<table border=\"0\" cellborder=\"1\" cellspacing=\"0\">\n" +
        "<tr><td>Identificador</td><td>Tipo</td><td>Linea</td><td>Columna</td></tr>\n";
      // end
      // access to the static list of the table symbol
      if (Symbololo.errorList !== undefined) {
        Symbololo.errorList.forEach((error: any) => {
          // add the row of the table
          graphviz += "<tr><td>" + error.description + "</td><td>" + error.type + "</td><td>" + error.line + "</td><td>" + error.column + "</td></tr>\n";
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
        Symbololo.errorList = [];
    }
  }
  