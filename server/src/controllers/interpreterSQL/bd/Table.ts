import { Literal } from "../abstract/Return";

export class Table {
    public name: string;
    //clientes: id_client, nombre, apellido, telefono
    //0, juan, perez, 4546225
    //[clave: pbject tipo LITERAL] = valor de cualquier tipo  
    public tuples: { [key: string]: any }[];  //Cada una de las filas guardadas
    public fields : Literal[];  //Cada una de las columnas almacenadasj

    constructor(name: string, fields: Literal[]) {
        this.name = name;
        this.fields = fields;
        this.tuples = [];
    }
}