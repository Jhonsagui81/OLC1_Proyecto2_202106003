import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { Type } from "../../abstract/Return";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class Truncate  extends AbstractSQLExpression{
    public expres1: any; 
    constructor(line:number, column: number, 
        private exp: LiteralExpression | id | aritmetica,
        private numero: number){
        super(line, column);
        this.expres1 = undefined

    }
    public interpret(context: Context) {
        let exp1 = this.exp.interpret(context); 
        this.expres1 = exp1?.value; 

        let result = ''; 
        //procedimiento para truncar 
        const factor = Math.pow(10, this.numero);
        result += (Math.trunc(exp1?.value * factor) / factor).toString();
        result += "\n\n"; 

        
        return result
    }

    public getAST(): Node {
        let node: Node = new Node("NATIVA");
        node.addChild("SELECT");
        node.addChild("TRUNCATE");
        node.addChild("(");
        let nodeID: Node = new Node("EXP");     
        nodeID.addChildsNode(this.exp.getAST());
        nodeID.addChild(",");
        nodeID.addChild(this.numero.toString());
        node.addChildsNode(nodeID);
        node.addChild(")")
        return node;
    }
}