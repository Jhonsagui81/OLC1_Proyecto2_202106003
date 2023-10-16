import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';

export class delete_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: String, private name_column: String ){
        super(line, column);
    }

    public interpret(context: Context){
        
    }
}