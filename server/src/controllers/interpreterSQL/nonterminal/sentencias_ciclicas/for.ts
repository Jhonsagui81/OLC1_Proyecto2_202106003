import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";

export class For extends AbstractSQLExpression {

    constructor(line:number, column:number, 
        private i: string,
        private num1: number,
        private num2:number,
        private instruc_if: any[]){
            super(line,column);
        }
        public interpret(context: Context) {
            let result = '';
            result += '->FOR'
            this.instruc_if.forEach((ele) => {
                try{
                    result += ele.interpret(context); 
                } catch {} 
            });
            return result;
        }

        public getAST(): Node {
            let node: Node = new Node("FOR");
            node.addChild("FOR");
            let nodeID: Node = new Node("ITERA");     
            nodeID.addChild(this.i);
            node.addChildsNode(nodeID);
            let nodeR: Node = new Node("RANGO");     
            nodeR.addChild(this.num1.toString());
            nodeR.addChild(this.num2.toString());
            node.addChildsNode(nodeR);
            let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                
            node.addChildsNode(nodeInst);
            node.addChild("END");
            node.addChild("LOOP");
            return node; 
        }
}