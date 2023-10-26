import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';
import { LiteralExpression } from '../../../terminal/LiteralExpression';
import { id } from '../../../terminal/id';

export class where_all_not extends AbstractSQLExpression {

    public oper_verdadero: string;
    public expres1: any;
    constructor(line:number, colum: number, 
        private name_table: string,
        private name_colum_condicion: string,
        private operador: string,
        private expre: LiteralExpression | id ){
            super(line, colum);
            this.oper_verdadero = '';
            this.expres1 = undefined;
        }

        public interpret(context: Context) {
            let exp = this.expre.interpret(context);  //retorno value, type
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

            result += "->CONSULTA SELECT * FROM "+this.name_table+" WHERE NOT "+this.name_colum_condicion+" "+this.operador+" "+exp.value+"\n";
            result += context.where_all_rela(this.name_table, this.name_colum_condicion, this.oper_verdadero, exp.value);
           // context.while_all(this.name_table, this.name_colum_condicion, this.operador, )
            result += '\n\n'
            return result;
        }
        public getAST(): Node {
            let node: Node = new Node("SELECT");
            node.addChild("SELECT");
            node.addChild("*");
            node.addChild("FROM");
            let nodeID: Node = new Node("ID");
            nodeID.addChild(this.name_table);
            node.addChildsNode(nodeID);
            node.addChild("WHERE");
            node.addChild("NOT"); 

            let node_con1: Node = new Node("CONDICION");
            node_con1.addChild(this.name_colum_condicion);
            node_con1.addChild(this.operador);
            node_con1.addChild(this.expres1);
            node.addChildsNode(node_con1);

            return node; 
        }
}