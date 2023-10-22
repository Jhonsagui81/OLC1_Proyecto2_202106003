import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { column_update } from "../../../abstract/Return";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class columna_update extends AbstractSQLExpression {

    constructor(line: number, column: number, private name_column: string, private exp: LiteralExpression | id){
        super(line, column);
    }


    public interpret(context: Context): column_update {
        let exp = this.exp.interpret(context);

        return {valor: exp.value, id: this.name_column};
    }
}