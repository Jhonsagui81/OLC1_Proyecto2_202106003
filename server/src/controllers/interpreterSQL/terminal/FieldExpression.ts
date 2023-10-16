import { AbstractSQLExpression } from '../abstract/AbstractSQLExpression';
import { Type, Literal } from '../abstract/Return';
import { Context } from '../abstract/Context';

export class FieldExpression extends AbstractSQLExpression {


  constructor( line: number, column: number,
    private name: String,   //nombre  y el tipo 
    private type: Type
  ) {
    super(line, column);
  }

  //Este metodo retorna el nombre y el titulo para poder guardarlo en la tabla 
  public interpret(context:Context): Literal{
    // verificar el tipo de dato
    return {value: this.name, type: this.type};
  }


}