import { AbstractSQLExpression } from '../abstract/AbstractSQLExpression';
import { Type, Literal } from '../abstract/Return';
import { Context } from '../abstract/Context';
import ReturnType from '../tools/ReturnType';
import Tree from '../tools/Tree';
import { Node } from '../abstract/Node';

export class FieldExpression extends AbstractSQLExpression {


  constructor( line: number, column: number,
    private name: string,   //nombre  y el tipo 
    private type: Type
  ) {
    super(line, column);
  }

  //Este metodo retorna el nombre y el titulo para poder guardarlo en la tabla 
  public interpret(context:Context): Literal{
    // verificar el tipo de dato
    return {value: this.name, type: this.type};
  }

  public getAST(): Node {
      return new Node(this.name);
  }

}