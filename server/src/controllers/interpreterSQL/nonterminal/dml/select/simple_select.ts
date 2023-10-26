import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';
//import { LiteralExpression } from '../../../terminal/LiteralExpression';

export class simple_select extends AbstractSQLExpression {

    constructor( line: number, column: number,private name:[],
      private name_table: string) { //LiteralExpresion porque debe retornar tipas
      super(line, column);
  
    }
  
    public interpret(context : Context){
      let result = '';
      result += "->CONSULTA SELECT ";
      let neww = '';
      for(let ele of this.name){
        neww += ele+", ";
      }
      result += neww.slice(0, -2)
      result += " FROM "+this.name_table+"\n";


      result += context.simple_select(this.name, this.name_table);
      result += '\n\n'
      return result;
    }
    public getAST(): Node {
      let node: Node = new Node("SELECT");
      node.addChild("SELECT");
      let node_colu: Node = new Node("COLUMNAS");
      this.name.forEach((ele) => {
        node_colu.addChild(ele);
      })
      node.addChildsNode(node_colu);
      node.addChild("FROM");
      let nodeID: Node = new Node("ID");
      nodeID.addChild(this.name_table);
      node.addChildsNode(nodeID);

      return node; 
  }
}