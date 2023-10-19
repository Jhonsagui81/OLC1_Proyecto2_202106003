import { Type, Literal } from '../abstract/Return';

export class Symbol {
    public valor: any;
    public id: string;
    public type: Type;

    constructor(valor: any, id: string, type: Type){
        this.valor = valor;
        this.id = id;
        this.type = type;
    }
}