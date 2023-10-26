import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class delete_logic extends AbstractSQLExpression {

    constructor(line:number, column: number, 
        private id:string,
        private condi1: string,
        private opera1:string,
        private exp1: LiteralExpression | id,
        private logic:string,
        private condi2:string,
        private opera2:string,
        private exp2: LiteralExpression | id){
            super(line, column);
        }

        public interpret(context: Context) {
            let exp1 = this.exp1.interpret(context);
            let exp2 = this.exp2.interpret(context);
            let result = '';

            result += "->DELETE FROM "+this.id+" WHERE "+ this.condi1+" "+this.opera1+" "+exp1.value+" "+this.logic+" "+this.condi2+" "+this.opera2+" "+exp2.value+"\n\n";
            context.delete_logicos(this.id, this.condi1, this.opera1, exp1.value, this.logic, this.condi2, this.opera2, exp2.value);
            return result; 
        }
        public getAST(): Node {
            return new Node("");
        }
}