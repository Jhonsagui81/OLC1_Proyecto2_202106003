import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class Len extends AbstractSQLExpression{
    constructor(line:number, column: number, private cadena: LiteralExpression|id|aritmetica){
        super(line, column);

    }
    public interpret(context: Context) {
        let exp = this.cadena.interpret(context); 
        let result = ''; 
        result += exp?.value.length.toString() +"\n\n"
        return result
    }

    public getAST(): Node {
        let node: Node = new Node("NATIVA");
        node.addChild("SELECT");
        node.addChild("UPPER");
        node.addChild("(");
        let nodeID: Node = new Node("EXP");     
        nodeID.addChildsNode(this.cadena.getAST());
        node.addChildsNode(nodeID);
        node.addChild(")")
        return node;
    }
}