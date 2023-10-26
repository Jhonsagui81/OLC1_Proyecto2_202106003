
import { Context } from "../../../abstract/Context";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";
import { Node } from "../../../abstract/Node";


export class where_column_relaci extends AbstractSQLExpression {
    constructor(line: number, colum: number,
        private  columnas: [],
        private name_table: string,
        private name_colum_condicion: string,
        private operador: string,
        private expre: LiteralExpression | id) {
        super(line, colum);

    }

    public interpret(context: Context) {
        let result = '';
        let exp = this.expre.interpret(context);

        result += "->CONSULTA SELECT ";
        let neww = '';
        for(let ele of this.columnas){
            neww += ele+", ";
        }
        result += neww.slice(0, -2)
        result += " FROM "+this.name_table+" WHERE "+this.name_colum_condicion+" "+this.operador+" "+exp.value+"\n";
        result += context.where_column_rela(this.columnas, this.name_table, this.name_colum_condicion, this.operador, exp.value);
        result += '\n\n';
        return result; 
    }
    public getAST(): Node {
        return new Node("");
    }

}
