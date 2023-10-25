import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { FieldExpression } from '../../../terminal/FieldExpression';
import { Context } from '../../../abstract/Context';
import { Table } from '../../../bd/Table';

export class CreateTableExpression extends AbstractSQLExpression {


  constructor( line: number, column: number,private name: String,private fields: FieldExpression[]) {
    super(line, column);
  }

  public interpret(context: Context){  
    //Permite recorrer todo lo que recibe atributo fields
    let result = '';
    const fields = this.fields.map((item) => { 
      const value = item.interpret(context); //referencia a las columnas retorna valor, type
      return value; //retorna a la variable fields local 
    });
    // se crea una tabla con el nombre:
    context.saveTable(this.name.toString(),new Table(this.name.toString(),fields));
    result += '-> Se creo tabla '+ this.name+'\n\n';
    return result;
  }


}