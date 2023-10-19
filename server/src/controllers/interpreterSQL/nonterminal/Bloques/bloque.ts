import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";

export class bloque extends AbstractSQLExpression{

    constructor(line:number, column:number, private expresion: any[]){
        super(line, column);
    }
    
    public interpret(context: Context) {
        let NuevoContexto = new Context(context);
        
        for (const exp of this.expresion){
            exp.interpret(NuevoContexto);
        }
    }
}