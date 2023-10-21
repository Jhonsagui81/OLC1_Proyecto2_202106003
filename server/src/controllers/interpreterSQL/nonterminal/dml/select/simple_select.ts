import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
//import { LiteralExpression } from '../../../terminal/LiteralExpression';

export class simple_select extends AbstractSQLExpression {

    constructor( line: number, column: number,private name:[],
      private name_table: string) { //LiteralExpresion porque debe retornar tipas
      super(line, column);
  
    }
  
    public interpret(context : Context){
      console.log("\nRESULTADO DE CONSULTA SELECT [] FROM "+this.name+"\n");
      context.simple_select(this.name, this.name_table);

    }
}