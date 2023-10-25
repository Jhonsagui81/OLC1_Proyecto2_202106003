import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
//import { LiteralExpression } from '../../../terminal/LiteralExpression';

export class simple_select extends AbstractSQLExpression {

    constructor( line: number, column: number,private name:[],
      private name_table: string) { //LiteralExpresion porque debe retornar tipas
      super(line, column);
  
    }
  
    public interpret(context : Context){
      let result = '';
      result += "->CONSULTA SELECT ";
      let neww = '';
      for(let ele of this.name){
        neww += ele+", ";
      }
      result += neww.slice(0, -2)
      result += " FROM "+this.name_table+"\n";


      result += context.simple_select(this.name, this.name_table);
      result += '\n\n'
      return result;
    }
}