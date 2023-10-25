import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { columna_update } from "./colum_update";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class update_relacional extends AbstractSQLExpression {

    constructor(line:number, column: number, 
        private id:string,
        private lista: columna_update[], 
        private column_condi: string, 
        private opera: string,
        private exp1: LiteralExpression | id ){
            super(line, column);
        }



        public interpret(context: Context) {
            let exp = this.exp1.interpret(context);
            let result = '';

            const fields = this.lista.map((elemento) =>{
                const value = elemento.interpret(context);
                return value;
            });
            
            result+="-> UPDATE "+this.id+" SET ";
            let neww = '';
            fields.forEach((ele) =>{
                neww += ele.id+" = "+ele.valor+", ";
            }); 

            result += neww.slice(0, -2)
            result += " WHERE "+this.column_condi+" "+this.opera+" "+exp.value+"\n\n";
            context.update_relacionales(this.id, fields, this.column_condi, this.opera, exp.value);
            return result; 
        }
}