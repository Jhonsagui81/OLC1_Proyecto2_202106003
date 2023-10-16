import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';

export class delete_table extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string){
        super(line, column);
    }

    public interpret(context: Context){
       context.delete_table(this.name);
    }
}