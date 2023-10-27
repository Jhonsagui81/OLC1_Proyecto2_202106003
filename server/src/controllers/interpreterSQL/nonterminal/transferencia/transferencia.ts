import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";

export class Transferencia extends AbstractSQLExpression {

    constructor(line: number, column: number, private senten: string){
        super(line, column);
    }
    public interpret(context: Context) {
        let result = '';
        return result;
    }
    public getAST(): Node {
        let nodo: Node = new Node("TRANSFERENCIA");
        if(this.senten.toLocaleLowerCase() == 'break'){
            nodo.addChild("BREAK");
        }else{
            nodo.addChild("CONTINUE");
        }
        return nodo; 
        
    }
}