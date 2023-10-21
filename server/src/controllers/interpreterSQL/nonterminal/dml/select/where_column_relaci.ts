
import { Context } from "../../../abstract/Context";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";


export class where_column_relaci extends AbstractSQLExpression {
    constructor(line: number, colum: number,
        private  columnas: [],
        private name_table: string,
        private name_colum_condicion: string,
        private operador: string,
        private expre: LiteralExpression | id) {
        super(line, colum);

    }

    public interpret(context: Context) {
        let exp = this.expre.interpret(context);
        console.log("\nRESULTADO DE CONSULTA SELECT [...] FROM "+this.name_table+" WHERE "+this.name_colum_condicion+" "+this.operador+" "+exp.value+"\n");
        context.where_column_rela(this.columnas, this.name_table, this.name_colum_condicion, this.operador, exp.value);
    }

}
