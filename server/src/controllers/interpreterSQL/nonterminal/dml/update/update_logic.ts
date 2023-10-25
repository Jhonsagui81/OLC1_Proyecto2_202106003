import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { columna_update } from "./colum_update";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class update_logic extends AbstractSQLExpression {

    constructor(line:number, column: number, 
        private id:string,
        private lista: columna_update[], 
        private column_condi1: string, 
        private opera1: string,
        private exp1: LiteralExpression | id,
        private logic: string,
        private column_condi2:string,
        private opera2:string,
        private exp2:LiteralExpression | id ){
            super(line, column);
        }



        public interpret(context: Context) {
            let exp1 = this.exp1.interpret(context);
            let exp2 = this.exp2.interpret(context);
            let result =''; 

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
            result +=" WHERE "+this.column_condi1+" "+this.opera1+" "+exp1.value+" "+this.logic+" "+this.column_condi2+" "+this.opera2+" "+exp2.value+"\n\n";
            context.update_logic(this.id, fields, this.column_condi1, this.opera1, exp1.value, this.logic, this.column_condi2, this.opera2, exp2.value );
            return result; 
        }
}