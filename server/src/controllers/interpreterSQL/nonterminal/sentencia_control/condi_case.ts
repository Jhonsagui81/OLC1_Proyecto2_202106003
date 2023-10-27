import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class Condi_case extends AbstractSQLExpression {

    constructor(line:number, column:number, 
        private exp1: LiteralExpression|id|aritmetica,
        private logic: string,
        private exp2: LiteralExpression|id|aritmetica,
        private result: LiteralExpression){
            super(line, column);

        }

        public interpret(context: Context) {
            let result = '';
            return result; 
        }
        public getAST(): Node {
            console.log("LLEGA AWUI SDASD")
            let node: Node = new Node("CONDICIONES");
            if(this.exp1 == null && this.logic == null){
                node.addChild("ELSE");
                let node_re: Node = new Node("RESULT");
                node_re.addChildsNode(this.result.getAST());
                node.addChildsNode(node_re);
            }else if(this.logic == null){
                node.addChild("WHEN");
                let node_valor: Node = new Node("VALOR")
                node_valor.addChildsNode(this.exp1.getAST())
                node.addChildsNode(node_valor);
                node.addChild("THEN");
                let node_re: Node = new Node("RESULT");
                node_re.addChildsNode(this.result.getAST());
                node.addChildsNode(node_re);
            }else{
                node.addChild("WHEN");
                let node_valor: Node = new Node("VALOR")
                node_valor.addChildsNode(this.exp1.getAST())
                node.addChildsNode(node_valor);

                node.addChild(this.logic);

                let node_valor1: Node = new Node("VALOR")
                node_valor1.addChildsNode(this.exp2.getAST())
                node.addChildsNode(node_valor1);

                let node_re: Node = new Node("RESULT");
                node_re.addChildsNode(this.result.getAST());
                node.addChildsNode(node_re);
            }
            return node; 
        }
}