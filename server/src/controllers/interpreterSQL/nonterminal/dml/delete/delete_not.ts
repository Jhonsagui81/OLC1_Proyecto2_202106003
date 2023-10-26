import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class delete_not extends AbstractSQLExpression {

    public oper_verdadero: string;
    constructor(line:number, column: number,
        private id: string, 
        private column_condi:string,
        private oper:string,
        private exp: LiteralExpression | id){
            super(line, column);
            this.oper_verdadero = '';
        }

        public interpret(context: Context) {
            let exp = this.exp.interpret(context);
            let result = "";
            switch(this.oper){
                case '=':
                    this.oper_verdadero = '!=';
                    break;
                case '!=':
                    this.oper_verdadero = '=';
                    break;
                case '<':
                    this.oper_verdadero = '>';
                    break;
                case '<=':
                    this.oper_verdadero = '>=';
                    break;
                case '>':
                    this.oper_verdadero = '<';
                    break;
                case '>=':
                    this.oper_verdadero = '<=';
                    break;
            }
            result += "->DELETE FROM "+this.id+" WHERE NOT "+ this.column_condi+" "+this.oper+" "+exp.value+"\n\n";
            //llama metodo
            context.delete_relacionales(this.id, this.column_condi, this.oper_verdadero, exp.value);
            return result; 
        }

        public getAST(): Node {
            return new Node("");
        }
}