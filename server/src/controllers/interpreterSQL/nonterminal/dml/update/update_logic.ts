import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Context } from "../../../abstract/Context";
import { columna_update } from "./colum_update";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { Node } from "../../../abstract/Node";

export class update_logic extends AbstractSQLExpression {
    public expres1:any;
    public expres2:any;
    constructor(line:number, column: number, 
        private id:string,
        private lista: columna_update[], 
        private column_condi1: string, 
        private opera1: string,
        private exp1: LiteralExpression | id,
        private logic: string,
        private column_condi2:string,
        private opera2:string,
        private exp2:LiteralExpression | id ){
            super(line, column);
            this.expres1 = undefined;
            this.expres2 = undefined; 
        }



        public interpret(context: Context) {
            let exp1 = this.exp1.interpret(context);
            this.expres1 = exp1.value;
            let exp2 = this.exp2.interpret(context);
            this.expres2 = exp2.value; 
            let result =''; 

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
            result +=" WHERE "+this.column_condi1+" "+this.opera1+" "+exp1.value+" "+this.logic+" "+this.column_condi2+" "+this.opera2+" "+exp2.value+"\n\n";
            context.update_logic(this.id, fields, this.column_condi1, this.opera1, exp1.value, this.logic, this.column_condi2, this.opera2, exp2.value );
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
            node_con1.addChild(this.column_condi1);
            node_con1.addChild(this.opera1);
            node_con1.addChild(this.expres1);
            node.addChildsNode(node_con1);

            let node_con2: Node = new Node("CONDICION2");
            node.addChild(this.logic);
            node_con2.addChild(this.column_condi2);
            node_con2.addChild(this.opera2);
            node_con2.addChild(this.expres2);
            node.addChildsNode(node_con2)

            return node; 
        }
}