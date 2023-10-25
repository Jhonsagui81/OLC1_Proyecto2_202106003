
import { Context } from "../../../abstract/Context";
import { LiteralExpression } from "../../../terminal/LiteralExpression";
import { id } from "../../../terminal/id";
import { AbstractSQLExpression } from "../../../abstract/AbstractSQLExpression";



export class where_column_not extends AbstractSQLExpression {

    public oper_verdadero:string;
    constructor(line: number, colum: number,
        private  columnas: [],
        private name_table: string,
        private name_colum_condicion: string,
        private operador: string,
        private expre: LiteralExpression | id) {
        super(line, colum);
        this.oper_verdadero = '';
    }

    public interpret(context: Context) {
        let exp = this.expre.interpret(context);
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

}
