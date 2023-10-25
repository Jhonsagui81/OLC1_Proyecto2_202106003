import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class delete_relacional extends AbstractSQLExpression {
    constructor(line:number, column:number,
        private id:string,
        private column_condi:string,
        private oper:string,
        private exp: LiteralExpression | id){
            super(line, column);

        }

        public interpret(context: Context) {
            let exp1 = this.exp.interpret(context);
            let result = '';
            result += "->DELETE FROM "+this.id+" WHERE "+ this.column_condi+" "+this.oper+" "+exp1.value+"\n\n";
            context.delete_relacionales(this.id, this.column_condi, this.oper, exp1.value);
            return result; 
        }
}