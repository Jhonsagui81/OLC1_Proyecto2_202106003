import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class If extends  AbstractSQLExpression{

    constructor(line: number, column: number, 
        private exp1: LiteralExpression | id |aritmetica|any,
        private logic: string|any,
        private exp2: LiteralExpression | id |aritmetica|any,
        private instruc_if: any[],
        private instruc_else: any[]|any
        ){
            super(line, column);
        }

        public interpret(context: Context) {
            let result = '';
            result += '-> IF\n';
            return result
        }

        public getAST(): Node {

            let node: Node = new Node("IF");

            if(this.logic == null && this.instruc_else ==null){ //if simple

                node.addChild("IF");
                let nodeID: Node = new Node("CONDICION");     
                nodeID.addChildsNode(this.exp1.getAST());
                node.addChildsNode(nodeID);
                node.addChild("THEN")
                node.addChild("BEGIN")
                let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                
                node.addChildsNode(nodeInst);
                node.addChild("END"); 
            }else if (this.logic != null && this.instruc_else == null){ //if relacionales
                console.log("ENTRA AL IF RELAIONALES")
                node.addChild("IF");

                let nodeID: Node = new Node("CONDICION1");     
                nodeID.addChildsNode(this.exp1.getAST());
                node.addChildsNode(nodeID);

                node.addChild(this.logic);

                let nodeID2: Node = new Node("CONDICION2");     
                nodeID2.addChildsNode(this.exp2.getAST());
                node.addChildsNode(nodeID2);

                node.addChild("THEN")
                node.addChild("BEGIN");
                let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeInst);
                node.addChild("END"); 
            }else if (this.logic == null && this.instruc_else != null){ //if else - simple
                node.addChild("IF");

                let nodeID: Node = new Node("CONDICION1");     
                nodeID.addChildsNode(this.exp1.getAST());
                node.addChildsNode(nodeID);

                node.addChild("THEN")
                let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeInst);
                
                node.addChild("ELSE");
                let nodeelse: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeelse.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeelse);
                node.addChild("END");
                node.addChild("IF"); 

            } else{
                node.addChild("IF");
                let nodeID: Node = new Node("CONDICION1");     
                nodeID.addChildsNode(this.exp1.getAST());
                node.addChildsNode(nodeID);

                node.addChild(this.logic);

                let nodeID2: Node = new Node("CONDICION2");     
                nodeID2.addChildsNode(this.exp2.getAST());
                node.addChildsNode(nodeID2);

                node.addChild("THEN")
                let nodeInst: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeInst.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeInst);
                
                node.addChild("ELSE");
                let nodeelse: Node = new Node("INSTRUCIONES");
                this.instruc_if.forEach((ele) => {
                    try{
                        nodeelse.addChildsNode(ele.getAST());
                    } catch {} 
                });
                node.addChildsNode(nodeelse);
                node.addChild("END");
                node.addChild("IF"); 

            }
            
            return node; 
        }
}