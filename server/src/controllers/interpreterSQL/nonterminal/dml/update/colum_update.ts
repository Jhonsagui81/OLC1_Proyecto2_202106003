import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";
import { column_update } from "../../../abstract/Return";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class columna_update extends AbstractSQLExpression {

    public expres1: any;
    constructor(line: number, column: number, private name_column: string, private exp: LiteralExpression | id){
        super(line, column);
        this.expres1 = undefined;
    }


    public interpret(context: Context): column_update {
        let exp = this.exp.interpret(context);
        this.expres1 = exp.value; 

        return {valor: exp.value, id: this.name_column};
    }

    public getAST(): Node {
        let nodo: Node = new Node("=");
        nodo.addChild(this.name_column);
        nodo.addChild(this.expres1); 
        return nodo; 
    }
}