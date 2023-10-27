import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { FieldExpression } from "../../terminal/FieldExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";

export class Funcion extends AbstractSQLExpression{

    constructor(line:number, column: number,
        private id:string,
        private fields: FieldExpression[],
        private returnType: string, 
        private instruc_if: any[],
        private retur: FieldExpression|id|aritmetica){
            super(line, column);
        }
        public interpret(context: Context) {
            let result = '';
            result += '->FUNCION'
            this.instruc_if.forEach((ele) => {
                try{
                    result += ele.interpret(context); 
                } catch {} 
            });
            return result;
        }
        public getAST(): Node {
            let nodo: Node = new Node("FUNCION");
            nodo.addChild("CREATE");
            nodo.addChild("FUNCTION");
            let nodeID: Node = new Node("ID");     
            nodeID.addChild(this.id);
            nodo.addChildsNode(nodeID);
            nodo.addChild("(");
            let nodo_para: Node = new Node("PARAMETROS");
            this.fields.forEach((ele) => {
                try{
                    nodo_para.addChildsNode(ele.getAST());
                } catch {} 
            });
            nodo.addChildsNode(nodo_para);
            nodo.addChild(")");
            nodo.addChild("RETURNS")
            let nodo_tip: Node = new Node("TIPO");
            nodo_tip.addChild(this.returnType);
            nodo.addChildsNode(nodo_tip);
            nodo.addChild("BEGIN");
            let nodeInst: Node = new Node("INSTRUCIONES");
            this.instruc_if.forEach((ele) => {
                try{
                    nodeInst.addChildsNode(ele.getAST());
                } catch {} 
            });
            nodeInst.addChild("RETURN");
            nodeInst.addChildsNode(this.retur.getAST());
            nodo.addChildsNode(nodeInst);
            nodo.addChild("END");
            return nodo; 
        }
}