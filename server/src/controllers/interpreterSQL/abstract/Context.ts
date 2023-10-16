import { Table } from "../bd/Table";
import { Literal } from "./Return";


export class Context {
    //Estructura que permite alamacenar clave(nombretabla): valor(Una instancia de Table.ts) 
    private tables = new Map<string,Table>();   //  mapa de tablas

    // constructor
    constructor(private anterior: Context | null) { //recibe el contexto anterior o nulo en caso contexto global
        this.tables= new Map<string,Table>(); //inicializa la estructura en el constructor
    }

    // agregar una tabla
    public saveTable(id: string, table: Table) { //nombre_tabla, object Tabla.ts
        // verificar el ambito
        let env: Context | null = this; //esta variable sera ya sea tipo contexto o null y sele asigna el contexto que la llamo
        // verificar si la tabla ya existe
        if (!env.tables.has(id.toLowerCase())) {  //SI ESTA TABLA YA EXISTE
          // guardar la tabla en una tabla de simbolos
          env.tables.set(id.toLowerCase(),table); //AGREGARLE al contexto un id de tabla y objeto tabla
          this.getTables();
        }else {
          console.log("Error, La tabla "+id+" ya existe en el entorno");
          //printlist.push("Error, La tabla "+id+" ya existe en el entorno");
        }
      }
    
  // INSERTAR UNA TUPLA
  public Insert(id: string, fields: [], values: Literal[]) {
    // obtener ambito global
    const contextGlobal = this.getGlobal(); //Se necesita precisamente el contexto global porque ahi estan las tablas
    // verificar si la tabla existe
    if (contextGlobal.tables.has(id.toLowerCase())) { //verifica que la tabla existe
      // obtener la tabla
      const table = contextGlobal.tables.get(id.toLowerCase())!; //obtiene la tabla
      const fields_ = table.fields; //de la tabla extraida se hace una copia de sus columnas

      const newTuple: { [key: string]: any } = {}; // Se crea un nuevo objeto clave, valor
    
      fields_.forEach((literal) => { //Recoore todas las columnas de la tabla
        newTuple[literal.value] = null; //y en la tupla se guardan el valor como su clave
      });

      fields.forEach((field, index) => { // recorre las columnas traidas del interprete
        newTuple[field]= values[index]; // y en la nuva tupla se buscan por claves y se le asigana el tipo como valor 
      });

      // insertar la tupla en la tabla
      table.tuples.push(newTuple);
      this.getTables(); //imprime las tablas almacenadas

    } else {
      console.log("Error: la tabla no existe");
    }

  }

    // agregar una columna a la tabla
    public add_column(id: string, field: Literal) { //nombre_tabla, object Tabla.ts
      // verificar el ambito
      let env: Context | null = this; //esta variable sera ya sea tipo contexto o null y sele asigna el contexto que la llamo
      // verificar si la tabla ya existe
      if (env.tables.has(id.toLowerCase())) {  //SI ESTA TABLA YA EXISTE
        const table = env.tables.get(id.toLowerCase())!; //obtiene la tabla
        table.fields.push(field);
        this.getTables();
        
      }else {
        console.log("Error, La tabla "+id+" ya existe en el entorno");
        //printlist.push("Error, La tabla "+id+" ya existe en el entorno");
      }
    }

    //Eliminar una columna a la tabla
    public delete_column(id: string, column: string){
      let env: Context | null = this;
      if(env.tables.has(id.toLowerCase())){
        const table = env.tables.get(id.toLowerCase())!;
        const lista = table.fields;  //Obtengo la lista con los encabezados

        //Creo una lista con encabezados excepto con el que coincida 
        const new_list = lista.filter(obj => obj.value !== column);
  
        //Limpio los encabezados de la tabla
        table.fields.splice(0, table.fields.length);

        //vuelco a cargar la lista actualizada 
        for(let objeto of new_list){
          table.fields.push(objeto);
        }
        this.getTables();
        
      }
    }

    //Actualiza el nombre de la tabla 
    public rename_to(id: string, new_name: string){
      let env: Context | null = this;
      if(env.tables.has(id.toLowerCase())){
        let table = env.tables.get(id.toLowerCase())!;
        
        //cambia el nombre de la tabla 
        table["name"] = new_name;
        //Cambia el nombre en la estructura MAP para esa tabla
        //elimina el anterior
        env.tables.delete(id.toLowerCase());
        //inserta la tabla con la nueva key
        env.tables.set(new_name.toLowerCase(), table);
        
        //eliminar la tabla anterio, no actualizada

        this.getTables();

      }else{
        console.log("No existe tabla con ese id!")
      }
    }

    //Actualiza el nombre de alguna columna
    public rename_column(id: string, name_colum: string, new_name: string){
      let env: Context | null = this;
      if(env.tables.has(id.toLowerCase())){
       
       
        //Limpie lista original

        for(let objeto of env.tables.get(id.toLowerCase())!.fields){
          if(objeto.value == name_colum){
            objeto["value"] = new_name;
          }
        }
        this.getTables();
      }
    }

   // obtener el entorno global
   public getGlobal(): Context {
    // verificar el ambito
    let context: Context | null = this;

    // buscar la variable
    while (context.anterior != null) {
      // cambiar de ambito
      context = context.anterior;
    }

    // retornar el entorno global
    return context;
  }

    // obtener todas las tablas
    public getTables(){

      //tabla global
      const contextGlobal = this.getGlobal();
      // imprimir el nombre de todas las tablas
      console.log("Nombre de todas las tablas: ");
      for (const [key, value] of contextGlobal.tables) {
        console.log(key);
        // imprimir el nombre de todos los campos
        console.log("Nombre de todos los campos: ");
        value.fields.forEach((field) => {
          console.log(field);
        });
      }
    }


}