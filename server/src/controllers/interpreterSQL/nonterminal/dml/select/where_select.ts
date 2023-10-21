import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { LiteralExpression } from '../../../terminal/LiteralExpression';
import { id } from '../../../terminal/id';

export class where_all_relaci extends AbstractSQLExpression {


    constructor(line:number, colum: number, 
        private name_table: string,
        private name_colum_condicion: string,
        private operador: string,
        private expre: LiteralExpression | id ){
            super(line, colum);
        }

        public interpret(context: Context) {
            let exp = this.expre.interpret(context);  //retorno value, type
            
            context.where_all_rela(this.name_table, this.name_colum_condicion, this.operador, exp.value);
           // context.while_all(this.name_table, this.name_colum_condicion, this.operador, )


        }
}