import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { FieldExpression } from "../../terminal/FieldExpression";

export class Proce extends AbstractSQLExpression{

    constructor(line:number, column:number,
        private id:string,
        private fields: FieldExpression[] | [],
        private instruc_if: any[],){
            super(line, column);
        }
        public interpret(context: Context) {
            let result = '';
            result += '->PROCEDIMIENTO'
            this.instruc_if.forEach((ele) => {
                try{
                    result += ele.interpret(context); 
                } catch {} 
            });
            return result;
        }

        public getAST(): Node {
            let nodo: Node = new Node("METODO");
            nodo.addChild("CREATE");
            nodo.addChild("PROCEDURE")
            let nodeID: Node = new Node("ID");     
            nodeID.addChild(this.id);
            nodo.addChildsNode(nodeID);
            let nodo_para: Node = new Node("PARAMETROS");
            this.fields.forEach((ele) => {
                try{
                    nodo_para.addChildsNode(ele.getAST());
                } catch {} 
            });
            nodo.addChildsNode(nodo_para);
            nodo.addChild("AS");
            nodo.addChild("BEGIN");

            let nodeInst: Node = new Node("INSTRUCIONES");
            this.instruc_if.forEach((ele) => {
                try{
                    nodeInst.addChildsNode(ele.getAST());
                } catch {} 
            });
            nodo.addChildsNode(nodeInst);
            nodo.addChild("END");
            return nodo; 
        }
}