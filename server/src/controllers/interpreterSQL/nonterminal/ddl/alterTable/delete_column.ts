import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';

export class delete_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private name_column: string ){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
        context.delete_column(this.name, this.name_column);
        result += '-> Se elimino la columna '+this.name_column+' De la tabla: '+this.name+'\n\n';
        return result; 
    }
}