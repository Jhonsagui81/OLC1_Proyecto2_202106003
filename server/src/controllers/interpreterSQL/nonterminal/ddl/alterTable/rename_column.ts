import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';

export class rename_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name_table: string, private name_column: string, private new_name: string){
        super(line, column);
    }

    public interpret(context: Context){
        context.rename_column(this.name_table, this.name_column, this.new_name);
    }
}