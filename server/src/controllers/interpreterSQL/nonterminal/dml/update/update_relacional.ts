import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { columna_update } from "./colum_update";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { Node } from "../../../abstract/Node";

export class update_relacional extends AbstractSQLExpression {
    public expres1: any;
    constructor(line:number, column: number, 
        private id:string,
        private lista: columna_update[], 
        private column_condi: string, 
        private opera: string,
        private exp1: LiteralExpression | id ){
            super(line, column);
            this.expres1 = undefined; 
        }



        public interpret(context: Context) {
            let exp = this.exp1.interpret(context);
            this.expres1 = exp.value;
            let result = '';

            const fields = this.lista.map((elemento) =>{
                const value = elemento.interpret(context);
                return value;
            });
            
            result+="-> UPDATE "+this.id+" SET ";
            let neww = '';
            fields.forEach((ele) =>{
                neww += ele.id+" = "+ele.valor+", ";
            }); 

            result += neww.slice(0, -2)
            result += " WHERE "+this.column_condi+" "+this.opera+" "+exp.value+"\n\n";
            context.update_relacionales(this.id, fields, this.column_condi, this.opera, exp.value);
            return result; 
        }
        public getAST(): Node {
            let node: Node = new Node("UPDATE");
            node.addChild("UPDATE");
            let nodeID: Node = new Node("ID");
            nodeID.addChild(this.id);
            node.addChildsNode(nodeID);
            node.addChild("SET");
            let node_colu: Node = new Node("COLUMNAS");
            this.lista.forEach((ele) => {
                node_colu.addChildsNode(ele.getAST());
            });
            node.addChildsNode(node_colu); 
            node.addChild("WHERE"); 

            let node_con1: Node = new Node("CONDICION1");
            node_con1.addChild(this.column_condi);
            node_con1.addChild(this.opera);
            node_con1.addChild(this.expres1);
            node.addChildsNode(node_con1);

            return node;
        }
}