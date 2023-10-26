import { AbstractSQLExpression } from "../abstract/AbstractSQLExpression";
import { LiteralExpression } from "./LiteralExpression";
import { Context } from "../abstract/Context";
import { id } from "./id";
import { Type, Literal } from "../abstract/Return";
import ReturnType from "../tools/ReturnType";
import Tree from "../tools/Tree";
import { Node } from "../abstract/Node";

export class aritmetica extends AbstractSQLExpression{


    public value: any;
    public type: any;
    public format: any; 

    constructor(line:number, column:number, private exp1: LiteralExpression | id |aritmetica, private operador: string, private exp2: LiteralExpression | id|aritmetica ){
        super(line, column);
        this.value = null;    
        this.type = null; 
        this.format =  { day: '2-digit', month: '2-digit',year: 'numeric' };

    }

    public interpret(context: Context) {
        let izq = this.exp1.interpret(context);
        let der = this.exp2.interpret(context);
        
        
        switch(this.operador){
            case '+':
                if(izq?.type == Type.INT && der?.type == Type.INT){
                    this.value = izq?.value + der.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq?.type == Type.INT && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) + der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.INT && der?.type == Type.DATE){
                    const fecha = new Date(der?.value);
                    this.value = fecha.setDate(fecha.getDate() + izq?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.INT && der?.type == Type.VARCHAR){
                    this.value = izq?.value + parseInt(der?.value);
                    this.type = Type.INT;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.INT){
                    this.value = parseFloat(izq?.value) + parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DOUBLE){
                    this.value = izq?.value + der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DATE){
                    const fecha = new Date(der?.value);
                    this.value = fecha.setDate(fecha.getDate() + izq?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.VARCHAR){
                    this.value = izq?.value + parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DATE && der?.type == Type.INT){
                    const fecha = new Date(izq?.value);
                    this.value = fecha.setDate(fecha.getDate() + der?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.DATE && der?.type == Type.DOUBLE){
                    const fecha = new Date(izq?.value);
                    this.value = fecha.setDate(fecha.getDate() + der?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.DATE && der?.type == Type.VARCHAR){
                    const fecha = new Date(izq?.value);
                    this.value = fecha.setDate(fecha.getDate() + parseInt(der?.value));
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.INT){
                    this.value = parseInt(izq?.value) + der?.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) + der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.DATE){
                    this.value = der?.value.setDate(der?.value.getDate() + parseInt(der?.value));
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.VARCHAR){
                    this.value = izq?.value + der?.value
                    this.type = Type.VARCHAR;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '-':
                if(izq?.type == Type.INT && der?.type == Type.INT){
                    this.value = izq?.value - der?.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq?.type == Type.INT && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) - der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.INT && der?.type == Type.DATE){
                    const fecha = new Date(der?.value);
                    this.value = fecha.setDate(fecha.getDate() - izq?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.INT && der?.type == Type.VARCHAR){
                    this.value = izq?.value - parseInt(der?.value);
                    this.type = Type.INT;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.INT){
                    this.value = parseFloat(izq?.value) - parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DOUBLE){
                    this.value = izq?.value - der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DATE){
                    const fecha = new Date(der?.value);
                    this.value = fecha.setDate(fecha.getDate() - izq?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.VARCHAR){
                    this.value = izq?.value - parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DATE && der?.type == Type.INT){
                    const fecha = new Date(izq?.value);
                    this.value = fecha.setDate(fecha.getDate() - der?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.DATE && der?.type == Type.DOUBLE){
                    const fecha = new Date(izq?.value);
                    this.value = fecha.setDate(fecha.getDate() - der?.value);
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.DATE && der?.type == Type.VARCHAR){
                    const fecha = new Date(izq?.value);
                    this.value = fecha.setDate(fecha.getDate() - parseInt(der?.value));
                    //formata 
                    this.value = fecha.toLocaleDateString(undefined, this.format)
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.INT){
                    this.value = parseInt(izq?.value) - der?.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) - der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.DATE){
                    this.value = der?.value.setDate(der?.value.getDate() - parseInt(der?.value));
                    this.type = Type.DATE;
                    return this;
                } else if(izq?.type == Type.VARCHAR && der?.type == Type.VARCHAR){
                    this.value = izq?.value - der?.value
                    this.type = Type.VARCHAR;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '*':
                if(izq?.type == Type.INT && der?.type == Type.INT ){
                    this.value = izq?.value * der?.value;
                    this.type = Type.INT
                    return this; 
                } else if(izq?.type == Type.INT && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) * der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.INT){
                    this.value = izq?.value * parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DOUBLE){
                    this.value = izq?.value * der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '/':
                if(izq?.type == Type.INT && der?.type == Type.INT ){
                    this.value = izq?.value / der?.value;
                    this.type = Type.INT
                    return this; 
                } else if(izq?.type == Type.INT && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) / der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.INT){
                    this.value = izq?.value / parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DOUBLE){
                    this.value = izq?.value / der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '%':
                if(izq?.type == Type.INT && der?.type == Type.INT ){
                    this.value = izq?.value % der?.value;
                    this.type = Type.INT
                    return this; 
                } else if(izq?.type == Type.INT && der?.type == Type.DOUBLE){
                    this.value = parseFloat(izq?.value) % der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.INT){
                    this.value = izq?.value % parseFloat(der?.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq?.type == Type.DOUBLE && der?.type == Type.DOUBLE){
                    this.value = izq?.value % der?.value;
                    this.type = Type.DOUBLE;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '=':
                if(izq?.value == der?.value){
                    this.value = true;
                    this.type = Type.BOOLEAN
                    return this; 
                }else {
                    this.value = false;
                    this.type = Type.BOOLEAN
                    return this; 
                }
            case '!=':
                if(izq?.value != der?.value){
                    this.value = true;
                    this.type = Type.BOOLEAN
                    return this; 
                }else {
                    this.value = false;
                    this.type = Type.BOOLEAN
                    return this; 
                }
            case '<':
                if(izq?.value < der?.value){
                    this.value = true;
                    this.type = Type.BOOLEAN
                    return this; 
                }else {
                    this.value = false;
                    this.type = Type.BOOLEAN
                    return this; 
                }
            case '<=':
                if(izq?.value <= der?.value){
                    this.value = true;
                    this.type = Type.BOOLEAN
                    return this; 
                }else {
                    this.value = false;
                    this.type = Type.BOOLEAN
                    return this; 
                }
            case '>':
                if(izq?.value > der?.value){
                    this.value = true;
                    this.type = Type.BOOLEAN
                    return this; 
                }else {
                    this.value = false;
                    this.type = Type.BOOLEAN
                    return this; 
                }
            case '>=':
                if(izq?.value >= der?.value){
                    this.value = true;
                    this.type = Type.BOOLEAN
                    return this; 
                }else {
                    this.value = false;
                    this.type = Type.BOOLEAN
                    return this; 
                }
        } 
    }

    public getAST(): Node {
        let node: Node = new Node(this.operador.toString());
        node.addChildsNode(this.exp1.getAST());
        node.addChildsNode(this.exp2.getAST());

        return node; 
    }
  
}