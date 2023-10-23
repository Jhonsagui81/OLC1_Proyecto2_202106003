import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class print extends AbstractSQLExpression {

    constructor(line:number, column:number, public exp: LiteralExpression | id | aritmetica ){
        super(line, column);
    }

    public interpret(context: Context) {
        
    }
}