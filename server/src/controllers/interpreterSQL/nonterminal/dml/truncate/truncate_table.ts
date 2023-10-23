import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";


export class truncate_table extends AbstractSQLExpression {

    constructor(line:number, column: number, public id:string){
        super(line, column);

    }

    public interpret(context: Context) {
        context.truncate_table(this.id);
    }
}