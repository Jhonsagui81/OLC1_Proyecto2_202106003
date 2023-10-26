
import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';
import { LiteralExpression } from '../../../terminal/LiteralExpression';

export class InsertExpression extends AbstractSQLExpression {

//Adicional al arreglo de columnas se agrega un arreglo de datos a insertar en el constructor
    constructor( line: number, column: number,private name: string,
      private fields: [],private values: LiteralExpression[]) { //LiteralExpresion porque debe retornar tipas
      super(line, column);
        //nombre_tabla, lista_ids,  lista_valores
    }
  
    public interpret(context : Context){
      let result = '';
        if (this.fields.length == this.values.length) { //valida si los atributos recolectados es igual a la de los valores
            // insertar la tupla en la tabla
            // obtener los valores en un arreglo
          try{
            const values = this.values.map((item) => { //iterar los valores
              const value = item.interpret(context); //cada valor ejecu
              return value;
            });
            context.Insert(this.name.toString().toLocaleLowerCase(),this.fields,values);
          } catch{

          }
            
            result += '-> Se inserto un registro a la tabla: '+this.name+'\n\n';
          } else {
            result += "Error: la cantidad de campos no coincide con la cantidad de valores a insertar \n\n";
          }
      return result;
        
    }

    public getAST(): Node {
      let node: Node = new Node("INSERT INTO");
      let nodeID: Node = new Node("ID");
      nodeID.addChild(this.name);
      node.addChildsNode(nodeID);
      node.addChild("(");
      let node_co: Node = new Node("COLUMNS");
      try{
        this.fields.forEach((elemento)=> {
          node_co.addChild(elemento);
        });
      } catch{

      }
      node.addChildsNode(node_co);
      node.addChild(")");
      node.addChild("VALUES");
      node.addChild("(");

      let node_va: Node = new Node("VALORES");
      try{
        this.values.forEach((elemento)=> {
          node_va.addChildsNode(elemento.getAST());
        });
      }catch{

      }
      
      node.addChildsNode(node_va);
      node.addChild(")");

      return node; 

  }
}