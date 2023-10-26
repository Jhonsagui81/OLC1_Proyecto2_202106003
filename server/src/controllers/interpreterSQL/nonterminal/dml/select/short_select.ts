import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";

export class short_select extends AbstractSQLExpression {

    constructor(line: number, colum: number, private name_table: string){
        super(line, colum);
    }

    public interpret(context: Context) {
        let result = "->CONSULTA SELECT * FROM "+this.name_table+"\n";
        result += context.short_select(this.name_table);    
        result += '\n\n';
        return result;
    }

    public getAST(): Node {
        let node: Node = new Node("SELECT");
        node.addChild("SELECT");
        node.addChild("*");
        node.addChild("FROM");
        let nodeID: Node = new Node("ID");
        nodeID.addChild(this.name_table);
        node.addChildsNode(nodeID);
        return node;
    }
}