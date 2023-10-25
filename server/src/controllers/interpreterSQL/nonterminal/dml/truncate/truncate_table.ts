import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";


export class truncate_table extends AbstractSQLExpression {

    constructor(line:number, column: number, public id:string){
        super(line, column);

    }

    public interpret(context: Context) {
        let result = "->Se eliminaron todos los registros de la tabla: "+this.id+"\n\n";
        context.truncate_table(this.id);
        return result; 
    }
}