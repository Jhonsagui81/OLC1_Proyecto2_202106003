import { AbstractSQLExpression } from '../abstract/AbstractSQLExpression'; //la clase principal
import { Type, Literal } from '../abstract/Return';
import { Context } from '../abstract/Context';

export class LiteralExpression extends AbstractSQLExpression { //herencia


  constructor( line: number, column: number,
    private value: any, 
    private type: Type  //Debe ser de alguno de los tipos declarados en RETURN
  ) {
    super(line, column); //se hace referencia a que son atributos heredados
  }

  //Este metodo es heredado de la clase principal
  public interpret(context:Context): Literal{
    // verificar el tipo de dato
    switch (this.type) {
      case Type.INT:
        this.value = parseInt(this.value);
        break;
      case Type.DOUBLE:
        this.value = parseFloat(this.value);
        break;
      case Type.DATE:
        this.value = new Date(this.value);
        break;
      case Type.BOOLEAN:
        if (this.value == "true") {
          this.value = true;
        } else {
          this.value = false;
        }
        break;
      case Type.NULL:
        this.value = null;
        break;
    }
    return {value: this.value, type: this.type};
  }


}