import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { Node } from "../../../abstract/Node";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";

export class delete_not extends AbstractSQLExpression {
    public expres1: any;
    public oper_verdadero: string;
    constructor(line:number, column: number,
        private id: string, 
        private column_condi:string,
        private oper:string,
        private exp: LiteralExpression | id){
            super(line, column);
            this.oper_verdadero = '';
            this.expres1 = undefined;
        }

        public interpret(context: Context) {
            let exp = this.exp.interpret(context);
            this.expres1 = exp.value;
            let result = "";
            switch(this.oper){
                case '=':
                    this.oper_verdadero = '!=';
                    break;
                case '!=':
                    this.oper_verdadero = '=';
                    break;
                case '<':
                    this.oper_verdadero = '>';
                    break;
                case '<=':
                    this.oper_verdadero = '>=';
                    break;
                case '>':
                    this.oper_verdadero = '<';
                    break;
                case '>=':
                    this.oper_verdadero = '<=';
                    break;
            }
            result += "->DELETE FROM "+this.id+" WHERE NOT "+ this.column_condi+" "+this.oper+" "+exp.value+"\n\n";
            //llama metodo
            context.delete_relacionales(this.id, this.column_condi, this.oper_verdadero, exp.value);
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
            node.addChild("NOT"); 
            let node_con1: Node = new Node("CONDICION1");
            
            node_con1.addChild(this.column_condi);
            node_con1.addChild(this.oper);
            node_con1.addChild(this.expres1);
            node.addChildsNode(node_con1);
            return node; 

        }
}