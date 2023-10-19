import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";
import { FieldExpression } from "../../terminal/FieldExpression";

export class set extends AbstractSQLExpression{

    
    constructor(line:number, column:number, public id: string, private expresion: LiteralExpression | id | aritmetica){
        super(line, column);  
    }

    public interpret(context: Context) {
        let expres = this.expresion.interpret(context);
        
        context.set_variable(this.id, expres?.value);
    }
}