import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';

export class delete_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private name_column: string ){
        super(line, column);
    }

    public interpret(context: Context){
        context.delete_column(this.name, this.name_column)
    }
}