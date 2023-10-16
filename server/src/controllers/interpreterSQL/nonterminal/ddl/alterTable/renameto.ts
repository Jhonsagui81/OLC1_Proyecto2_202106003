import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';

export class rename_to extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private new_name: string){
        super(line, column);
    }

    public interpret(context: Context){
        context.rename_to(this.name.toString(), this.new_name.toString());
    }
}