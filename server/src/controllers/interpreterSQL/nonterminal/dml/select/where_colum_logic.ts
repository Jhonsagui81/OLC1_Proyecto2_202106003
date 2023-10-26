import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';
import { LiteralExpression } from '../../../terminal/LiteralExpression';
import { id } from '../../../terminal/id';

export class where_colum_logic extends AbstractSQLExpression {


    constructor(line:number, colum: number, 
        private columnas: [],
        private name_table: string,
        private condicion1: string,
        private oper1: string,
        private expre1: LiteralExpression | id,
        private logic:string,
        private condicion2:string,
        private oper2:string,
        private expre2: LiteralExpression | id ){
            super(line, colum);
        }

        public interpret(context: Context) {
            let exp1 = this.expre1.interpret(context);  //retorno value, type
            let exp2 = this.expre2.interpret(context);
            
            //result 
            let result = '';
            result += "->CONSULTA SELECT ";
            let neww = '';
            for(let ele of this.columnas){
                neww += ele+", ";
            }
            result += neww.slice(0, -2)
            result += " FROM "+this.name_table+" WHERE "+this.condicion1+" "+this.oper1+" "+exp1.value+" "+this.logic+" "+this.condicion2+" "+this.oper2+" "+exp2.value+"\n";
            result+= context.where_column_logic(this.columnas,this.name_table, this.condicion1, this.oper1, exp1.value, this.logic, this.condicion2, this.oper2, exp2.value);
            result += '\n\n';
            return result; 

        }
        public getAST(): Node {
            return new Node("");
        }
}