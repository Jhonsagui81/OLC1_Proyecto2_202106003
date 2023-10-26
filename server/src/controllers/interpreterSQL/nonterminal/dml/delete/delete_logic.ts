import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class delete_logic extends AbstractSQLExpression {
    public expres1: any;
    public expres2: any; 
    constructor(line:number, column: number, 
        private id:string,
        private condi1: string,
        private opera1:string,
        private exp1: LiteralExpression | id,
        private logic:string,
        private condi2:string,
        private opera2:string,
        private exp2: LiteralExpression | id){
            super(line, column);
            this.expres1 = undefined;
            this.expres2 = undefined;
        }

        public interpret(context: Context) {
            let exp1 = this.exp1.interpret(context);
            this.expres1 = exp1.value;
            let exp2 = this.exp2.interpret(context);
            this.expres2 = exp2.value;
            let result = '';

            result += "->DELETE FROM "+this.id+" WHERE "+ this.condi1+" "+this.opera1+" "+exp1.value+" "+this.logic+" "+this.condi2+" "+this.opera2+" "+exp2.value+"\n\n";
            context.delete_logicos(this.id, this.condi1, this.opera1, exp1.value, this.logic, this.condi2, this.opera2, exp2.value);
            return result; 
        }
        public getAST(): Node {
            let nodo: Node = new Node("DELETE FROM");
            nodo.addChild("DELETE");
            nodo.addChild("FROM");
            let nodeID: Node = new Node("ID");
            nodeID.addChild(this.id);
            nodo.addChildsNode(nodeID);
            nodo.addChild("WHERE");
            let node_con1: Node = new Node("CONDICION1");
            
            node_con1.addChild(this.condi1);
            node_con1.addChild(this.opera1);
            node_con1.addChild(this.expres1);

            nodo.addChildsNode(node_con1);

            let node_con2: Node = new Node("CONDICION2");
            nodo.addChild(this.logic);
            node_con2.addChild(this.condi2);
            node_con2.addChild(this.opera2);
            node_con2.addChild(this.expres2);
            nodo.addChildsNode(node_con2); 
            return nodo; 
        }
}