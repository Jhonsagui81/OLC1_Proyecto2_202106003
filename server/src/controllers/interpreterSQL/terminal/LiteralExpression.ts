import { AbstractSQLExpression } from '../abstract/AbstractSQLExpression'; //la clase principal
import { Type, Literal } from '../abstract/Return';
import { Context } from '../abstract/Context';
import Tree from '../tools/Tree';
import ReturnType from '../tools/ReturnType';
import { Node } from '../abstract/Node';

export class LiteralExpression extends AbstractSQLExpression { //herencia

  // public valor: any;
  // public tipo: any;

  constructor( line: number, column: number,public value: any, public type: Type)  //Debe ser de alguno de los tipos declarados en RETURN 
  {
    super(line, column); //se hace referencia a que son atributos heredados
    // this.valor = value;
    // this.tipo = type; 
  }

  //Este metodo es heredado de la clase principal
  public interpret(context:Context){
    // verificar el tipo de dato;
    switch (this.type) {
      case Type.INT:
        this.value = parseInt(this.value);
        this.type = Type.INT;
        break;
      case Type.DOUBLE:
        this.value = parseFloat(this.value);
        this.type = Type.DOUBLE;
        break;
      case Type.DATE:
        // console.log("lorq tare ed"+this.value);
        // let recortada = this.value.substring(1, this.value.length -1);
        // const partes = recortada.split("-");
        // this.value = new Date(parseInt(partes[0]), parseInt(partes[1])-1, parseInt(partes[2]));
        // this.type = Type.DATE;
        
        
        this.value = new Date(this.value);  
        this.type = Type.DATE; 

        // Formatear la fecha como 'YYYY-MM-DD'
        const options = { day: '2-digit', month: '2-digit',year: 'numeric' };
        this.value = this.value.toLocaleDateString(undefined, options);


        break;
      case Type.VARCHAR:
        const regex = /^\"/g;
        const regex2 = /\"$/g;
        //Quitar comillas al inicio y al final
        this.value = this.value.replace(regex, "").replace(regex2, "")
        //Quitar caracteres de escape /n /t // /"
        let string = this.value.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, "\"").replace(/\\/g, "\\");
        this.value = string;
        this.type = Type.VARCHAR;
        break;
      case Type.BOOLEAN:
        if (this.value == "true") {
          this.value = true;
          this.type = Type.BOOLEAN;
        } else {
          this.value = false;
          this.type = Type.BOOLEAN
        }
        break;
      case Type.NULL:
        this.value = null;
        this.value = Type.NULL
        break;
      case Type.NEGATIVE:
        if(this.value.type === Type.INT){
          this.value = Number(this.value) * -1;

          this.type = Type.NEGATIVE;
        } else if (this.value.type === Type.DOUBLE){
          this.value = parseFloat(this.value) * -1;
          this.type = Type.NEGATIVE;
        }else{
          console.log("Error: no se puede negar este tipo de dato")
        }
        
    }
    return this; 

  }

  public getAST(): Node {
      return new Node(this.value);
  }


}