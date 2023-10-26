
import { Context } from "../../../abstract/Context";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Node } from "../../../abstract/Node";



export class where_column_not extends AbstractSQLExpression {
    public expres1: any;
    public oper_verdadero:string;
    constructor(line: number, colum: number,
        private  columnas: [],
        private name_table: string,
        private name_colum_condicion: string,
        private operador: string,
        private expre: LiteralExpression | id) {
        super(line, colum);
        this.oper_verdadero = '';
        this.expres1 = undefined; 
    }

    public interpret(context: Context) {
        let exp = this.expre.interpret(context);
        this.expres1 = exp.value;
        let result = '';

        switch(this.operador){
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
        result += "->CONSULTA SELECT ";
        let neww = '';
        for(let ele of this.columnas){
            neww += ele+", ";
        }
        result += neww.slice(0, -2)
        result += " FROM "+this.name_table+" WHERE NOT "+this.name_colum_condicion+" "+this.operador+" "+exp.value+"\n";
        result += context.where_column_rela(this.columnas, this.name_table, this.name_colum_condicion, this.oper_verdadero, exp.value);
        result += '\n\n';
        return result; 
    }

    public getAST(): Node {
        let node: Node = new Node("SELECT");
        node.addChild("SELECT");
        let node_colu: Node = new Node("COLUMNAS");
        this.columnas.forEach((ele) => {
            node_colu.addChild(ele);
        });
        node.addChildsNode(node_colu);
        node.addChild("FROM")
        let nodeID: Node = new Node("ID");
        nodeID.addChild(this.name_table);
        node.addChildsNode(nodeID); 
        node.addChild("WHERE");    
        node.addChild("NOT");

        let node_con1: Node = new Node("CONDICION1");
        node_con1.addChild(this.name_colum_condicion);
        node_con1.addChild(this.operador);
        node_con1.addChild(this.expres1);
        node.addChildsNode(node_con1);    
        return node; 
    }

}
