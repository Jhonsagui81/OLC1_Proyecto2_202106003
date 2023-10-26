import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class delete_relacional extends AbstractSQLExpression {
    public expres1:any
    constructor(line:number, column:number,
        private id:string,
        private column_condi:string,
        private oper:string,
        private exp: LiteralExpression | id){
            super(line, column);
            this.expres1 = undefined;

        }

        public interpret(context: Context) {
            let exp1 = this.exp.interpret(context);
            this.expres1 = exp1.value;
            let result = '';
            result += "->DELETE FROM "+this.id+" WHERE "+ this.column_condi+" "+this.oper+" "+exp1.value+"\n\n";
            context.delete_relacionales(this.id, this.column_condi, this.oper, exp1.value);
            return result; 
        }

        public getAST(): Node {
            let node: Node = new Node("DELETE FROM");
            node.addChild("DELETE");
            node.addChild("FROM");
            let nodeID: Node = new Node("ID");
            nodeID.addChild(this.id);
            node.addChildsNode(nodeID);
            node.addChild("WHERE");
            let node_con1: Node = new Node("CONDICION1");
            
            node_con1.addChild(this.column_condi);
            node_con1.addChild(this.oper);
            node_con1.addChild(this.expres1);
            node.addChildsNode(node_con1);
            return node;
        }
}