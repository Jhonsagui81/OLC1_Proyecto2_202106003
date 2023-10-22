import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { columna_update } from "./colum_update";

export class update_logic_not extends AbstractSQLExpression {

    public oper_verdadero:string;
    constructor(line:number, column: number,
        private id:string,
        private lista: columna_update[],
        private column_condi: string,
        private opera:string,
        private exp1: LiteralExpression| id ){
            super(line, column);
            this.oper_verdadero = '';

        }

        public interpret(context: Context) {
            let exp = this.exp1.interpret(context);

            const fields = this.lista.map((elemento) =>{
                const value = elemento.interpret(context);
                return value;
            });

            switch(this.opera){
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

            //llamar al metodo 
            context.update_relacionales(this.id, fields, this.column_condi, this.oper_verdadero, exp.value);
        }
}