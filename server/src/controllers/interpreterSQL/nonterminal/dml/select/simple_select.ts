import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { LiteralExpression } from '../../../terminal/LiteralExpression';

export class InsertExpression extends AbstractSQLExpression {

//Adicional al arreglo de columnas se agrega un arreglo de datos a insertar en el constructor
    constructor( line: number, column: number,private name: String,
      private fields: [],private values: LiteralExpression[]) { //LiteralExpresion porque debe retornar tipas
      super(line, column);
  
    }
  
    public interpret(context : Context){
        if (this.fields.length == this.values.length) { //valida si los atributos recolectados es igual a la de los valores
            // insertar la tupla en la tabla
            // obtener los valores en un arreglo
            const values = this.values.map((item) => { //iterar los valores
              const value = item.interpret(context); //cada valor ejecutarlo
              return value;
            });
            context.Insert(this.name.toString().toLocaleLowerCase(),this.fields,values);
          } else {
            console.log("Error: la cantidad de campos no coincide con la cantidad de valores");
          }
        
    }
}