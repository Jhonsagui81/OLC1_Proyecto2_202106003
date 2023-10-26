import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { FieldExpression } from '../../../terminal/FieldExpression';
import { Context } from '../../../abstract/Context';
import { Table } from '../../../bd/Table';
import Tree from '../../../tools/Tree';
import ReturnType from '../../../tools/ReturnType';
import { Node } from '../../../abstract/Node';

export class CreateTableExpression extends AbstractSQLExpression {

  constructor( line: number, column: number,private name: string,private fields: FieldExpression[]) {
    super(line, column);

  }

  public interpret(context: Context){  
    //Permite recorrer todo lo que recibe atributo fields
    let result = '';
    const fields = this.fields.map((item) => { 
      const value = item.interpret(context); //referencia a las columnas retorna valor, type
      return value; //retorna a la variable fields local 
    });
    // se crea una tabla con el nombre:
    context.saveTable(this.name.toString(),new Table(this.name.toString(),fields));
    result += '-> Se creo tabla '+ this.name+'\n\n';
    return result;
  }


  public getAST(): Node {
    let node: Node = new Node("CREATE TABLE");
    let nodeID: Node = new Node("IDENTIFICADOR");
    nodeID.addChild(this.name);
    node.addChildsNode(nodeID);
    node.addChild("(");
    let nodeColum: Node = new Node("ENCABEZADOS");

    this.fields.forEach((elemento)=> {
      nodeColum.addChildsNode(elemento.getAST());
    });

    node.addChildsNode(nodeColum);
    node.addChild(")");


    return node; 
  }


}