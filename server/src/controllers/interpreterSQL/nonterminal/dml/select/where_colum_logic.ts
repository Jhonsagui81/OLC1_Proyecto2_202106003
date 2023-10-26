import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';
import { LiteralExpression } from '../../../terminal/LiteralExpression';
import { id } from '../../../terminal/id';

export class where_colum_logic extends AbstractSQLExpression {

    public expres1: any;
    public expres2: any;
    constructor(line:number, colum: number, 
        private columnas: [],
        private name_table: string,
        private condicion1: string,
        private oper1: string,
        private expre1: LiteralExpression | id,
        private logic:string,
        private condicion2:string,
        private oper2:string,
        private expre2: LiteralExpression | id ){
            super(line, colum);
            this.expres1 = undefined;
            this.expres2 = undefined; 
        }

        public interpret(context: Context) {
            let exp1 = this.expre1.interpret(context);  //retorno value, type
            this.expres1 = exp1.value;
            let exp2 = this.expre2.interpret(context);
            this.expres2 = exp2.value;
            
            //result 
            let result = '';
            result += "->CONSULTA SELECT ";
            let neww = '';
            for(let ele of this.columnas){
                neww += ele+", ";
            }
            result += neww.slice(0, -2)
            result += " FROM "+this.name_table+" WHERE "+this.condicion1+" "+this.oper1+" "+exp1.value+" "+this.logic+" "+this.condicion2+" "+this.oper2+" "+exp2.value+"\n";
            result+= context.where_column_logic(this.columnas,this.name_table, this.condicion1, this.oper1, exp1.value, this.logic, this.condicion2, this.oper2, exp2.value);
            result += '\n\n';
            return result; 

        }
        public getAST(): Node {
            let node: Node = new Node("SELECT");
            node.addChild("SELECT");
            let node_colu: Node = new Node("COLUMNAS");
            try{
                this.columnas.forEach((ele) => {
                    node_colu.addChild(ele);
                });
            } catch{
                
            }
            
            node.addChildsNode(node_colu);
            node.addChild("FROM")
            let nodeID: Node = new Node("ID");
            nodeID.addChild(this.name_table);
            node.addChildsNode(nodeID); 
            node.addChild("WHERE"); 

            let node_con1: Node = new Node("CONDICION1");
            node_con1.addChild(this.condicion1);
            node_con1.addChild(this.oper1);
            node_con1.addChild(this.expres1);
            node.addChildsNode(node_con1);

            let node_con2: Node = new Node("CONDICION2");
            node.addChild(this.logic);
            node_con2.addChild(this.condicion2);
            node_con2.addChild(this.oper2);
            node_con2.addChild(this.expres2);
            node.addChildsNode(node_con2)
            return node;
        }
}