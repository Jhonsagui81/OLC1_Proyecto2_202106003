import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class Typeof extends AbstractSQLExpression {
    public expres1: any;
    constructor(line:number, column:number, public exp: LiteralExpression | id | aritmetica ){
        super(line, column);
        this.expres1 = undefined;
    }

    public interpret(context: Context) {
        let result = '';
        let exp = this.exp.interpret(context); 
        this.expres1 = exp?.type; 
        return result += exp?.type+"\n\n";
    }
    public getAST(): Node {
        let node: Node = new Node("NATIVA");
        node.addChild("SELECT");
        node.addChild("TYPEOF")
        node.addChild("(")
        let nodeID: Node = new Node("EXP");     
        nodeID.addChildsNode(this.exp.getAST());
        node.addChildsNode(nodeID);
        node.addChild(")");
        return node; 
    }
}