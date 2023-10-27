import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class While extends AbstractSQLExpression {

    constructor(line:number, column:number,
        private exp1: LiteralExpression | id |aritmetica|any,
        private logic: string|any,
        private exp2: LiteralExpression | id |aritmetica|any,
        private instruc_if: any[]){
            super(line, column);
        }
        public interpret(context: Context) {
            let result = '';
            result += '->WHILE\n';
            this.instruc_if.forEach((ele) => {
                try{
                   result += ele.interpret(context);
                } catch {} 
            });
            return result; 
        }

        public getAST(): Node {
            let node: Node = new Node("WHILE");
            if(this.logic == null){
                node.addChild("WHILE");
                let nodeID: Node = new Node("CONDICION");     
                nodeID.addChildsNode(this.exp1.getAST());
                node.addChildsNode(nodeID);
                node.addChild("BEGIN");
                let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeInst);
                node.addChild("END");
            } else {
                node.addChild("WHILE");

                let nodeID: Node = new Node("CONDICION1");     
                nodeID.addChildsNode(this.exp1.getAST());
                node.addChildsNode(nodeID);
                
                node.addChild(this.logic);

                let nodeID2: Node = new Node("CONDICION2");     
                nodeID2.addChildsNode(this.exp2.getAST());
                node.addChildsNode(nodeID2);
                node.addChild("BEGIN");

                let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeInst);
                node.addChild("END"); 
            }
            return node; 
        }
}