import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { FieldExpression } from "../../terminal/FieldExpression";

export class varias_var extends AbstractSQLExpression{

    constructor(line: number, column: number, private fields: FieldExpression[]){
        super(line, column);

    }


    public interpret(context: Context) {
        const fields = this.fields.map((item) => {  //Lista con todas las variables a asignar
            const value = item.interpret(context); //retorna ID, type
            return value; //retorna a la variable fields local 
        });

        context.add_varias_variables(fields);

    }
}

//QUEDA PENDIENTE LA IMPLEMENTACION EN LA GRAMATICA 