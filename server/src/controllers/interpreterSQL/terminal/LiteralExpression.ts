import { AbstractSQLExpression } from '../abstract/AbstractSQLExpression'; //la clase principal
import { Type, Literal } from '../abstract/Return';
import { Context } from '../abstract/Context';

export class LiteralExpression extends AbstractSQLExpression { //herencia

  public valor: any;
  public tipo: any;

  constructor( line: number, column: number,private value: any, private type: Type)  //Debe ser de alguno de los tipos declarados en RETURN 
  {
    super(line, column); //se hace referencia a que son atributos heredados
    this.valor = value;
    this.tipo = type; 
  }

  //Este metodo es heredado de la clase principal
  public interpret(context:Context){
    // verificar el tipo de dato;
    switch (this.type) {
      case Type.INT:
        this.valor = parseInt(this.value);
        this.tipo = Type.INT;
        break;
      case Type.DOUBLE:
        this.valor = parseFloat(this.value);
        this.type = Type.DOUBLE;
        break;
      case Type.DATE:
        this.valor = new Date(this.value);
        this.tipo = Type.DATE;
        break;
      case Type.BOOLEAN:
        if (this.value == "true") {
          this.valor = true;
          this.tipo = Type.BOOLEAN;
        } else {
          this.valor = false;
          this.tipo = Type.BOOLEAN
        }
        break;
      case Type.NULL:
        this.valor = null;
        this.tipo = Type.NULL
        break;
      case Type.NEGATIVE:
        if(this.value.type === Type.INT){
          this.value.value = Number(this.value.value) * -1;
          this.tipo = Type.NEGATIVE;
        } else if (this.value.type === Type.DOUBLE){
          this.value.value = parseFloat(this.value.value) * -1;
          this.tipo = Type.NEGATIVE;
        }else{
          console.log("Error: no se puede negar este tipo de dato")
        }
        
    }
    return this; 
  }


}