import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";

export class short_select extends AbstractSQLExpression {

    constructor(line: number, colum: number, private name_table: string){
        super(line, colum);
    }

    public interpret(context: Context) {
        console.log("\nRESULTADO DE CONSULTA SELECT [] FROM "+this.name_table+"\n");
        context.short_select(this.name_table);    
    }
}