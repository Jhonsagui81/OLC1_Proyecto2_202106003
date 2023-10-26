import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";

export class bloque extends AbstractSQLExpression{

    constructor(line:number, column:number, private expresion: any[]){
        super(line, column);
    }
    
    public interpret(context: Context) { //contexto global
        let NuevoContexto = new Context(context);
        
        for (const exp of this.expresion){
            exp.interpret(NuevoContexto);
        }
    }

    public getAST(): Node {
        return new Node("");
    }
}