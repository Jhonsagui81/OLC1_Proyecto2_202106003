import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { FieldExpression } from '../../../terminal/FieldExpression';
import { Context } from '../../../abstract/Context';

export class add_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private field: FieldExpression){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
        const field_ = this.field.interpret(context);
        context.add_column(this.name, field_);
        result += '-> Se agrego la columna '+field_.value+' en la tabla: '+this.name+'\n\n';
        return result; 
    }
}