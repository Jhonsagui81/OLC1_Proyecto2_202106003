import { Table } from "../bd/Table";
import { Literal } from "./Return";
import { Symbol } from "../bd/Symbol";
import { Type } from "./Return";
import { LiteralExpression } from "../terminal/LiteralExpression";
import { FieldExpression } from "../terminal/FieldExpression";

export class Context {
    //Estructura que permite alamacenar clave(nombretabla): valor(Una instancia de Table.ts) 
    private tables = new Map<string,Table>();   //  mapa de tablas
    private symbolTable = new Map<string,Symbol>();  //Mapa de declaracion variables

    // constructor
    constructor(private anterior: Context | null) { //recibe el contexto anterior o nulo en caso contexto global
        this.tables= new Map<string,Table>(); //inicializa la estructura en el constructor
        this.symbolTable = new Map<string, Symbol>();
    }

    //Agregar Variables 
    public add_variable(id:string, valor:any){
      let env: Context = this;
      let symbol = new Symbol(null, id, valor);
      if(!env.symbolTable.has(id.toLowerCase())){ //si esta variable no esta en la tabla
        env.symbolTable.set(id.toLowerCase(), symbol); 
        //funcion para mostrar variables
        this.getVariables();

      } else {
        console.log("Error: la variable "+id+" Ya existe en el entorno");
      }
    }

    // Asignacion de varias variables 
    public add_varias_variables(variables: Literal[]){
      let env:Context = this;
      for(const elemento of variables){
        if(!env.symbolTable.has(elemento.value.toLowerCase())){
          let sym = new Symbol(null, elemento.value, elemento.type);
          env.symbolTable.set(elemento.value.toLowerCase(), sym ); //variable agregada
        }else{
          console.log("Error: la variable Ya existe en el entorno");
        }
      }

      this.getVariables();
    }

    //Declara una variable con un valor 
    public add_variable_dato(id:string, valor: any){
      let env: Context = this;
      let symbol = new Symbol(valor.value, id, valor.tipy);
      if(!env.symbolTable.has(id.toLowerCase())){ //si esta variable no esta en la tabla
        env.symbolTable.set(id.toLowerCase(), symbol); 
        //funcion para mostrar variables
        this.getVariables();
      } else {
        console.log("Error la variable "+id+" Ya existe en el entorno");
      }
    }

    //LE asiga un valor a la variable que este vacia 
    public set_variable(id:string, valor: any){
      let env: Context = this;
      if(!env.symbolTable.has(id.toLowerCase())){
        console.log("Esta variable no esta declarada en este ambito");
      }else{
        let aux = env.symbolTable.get(id.toLowerCase())!;
        aux["valor"] = valor
        this.getVariables();
      }
    }

    //Obtener variable 
    public get_symbol(id:string){
      let env: Context | null = this;
      let sym: Symbol = env.symbolTable.get(id.toLowerCase())!;
      while(sym == undefined && env.anterior != null){
        env = env.anterior;
        sym = env.symbolTable.get(id.toLowerCase())!;
      }
      return sym;
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
  public Insert(id: string, fields: [], values: LiteralExpression[]) {
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

  //Simple_SELECT
  public simple_select(columns: [], name: string){
    const contextGlobal = this.getGlobal();
    console.log("\nResultado de la clausula SELECT")
    console.log("-----------------------------------------------");
    if(contextGlobal.tables.has(name.toLowerCase())) {
      const table = contextGlobal.tables.get(name.toLowerCase())!;
      table.tuples.forEach((objeto) =>{
        const valores = Object.values(objeto); 

        columns.forEach((clave) => {
          const indice = Object.keys(objeto).indexOf(clave);
          console.log(`${clave}: ${valores[indice]["value"]}`);
          
        });
        console.log("-----------------------------------------------");
      });
    }
  }

  //short_SELECT
  public short_select(name: string){
    const contextGlobal = this.getGlobal();
    console.log("\nResultado de la clausula SELECT")
    console.log("-----------------------------------------------");
    if(contextGlobal.tables.has(name.toLowerCase())) {
      const table = contextGlobal.tables.get(name.toLowerCase())!;
      const nesdw = table.fields;
      table.tuples.forEach((objeto) =>{
        const valores = Object.values(objeto);

        nesdw.forEach((literal) => {  //id, nombre, colum
          const indice = Object.keys(objeto).indexOf(literal.value);
          console.log(`${literal.value}: ${valores[indice]["value"]}`);
        })
        console.log("-----------------------------------------------");
      });
    }
  }
  // SELECT [] WHERE REALACIONALES
  public where_column_rela(column:[], id: string, colu_condi:string, opera: string, valor:any){
    const contexGlobal = this.getGlobal();
    if(contexGlobal.tables.has(id.toLowerCase())) {
      const table = contexGlobal.tables.get(id.toLowerCase())!;
      const encabezado = table.fields;
      console.log("\nRESULTADO DE CONSULTA SELECT [] FROM "+id+" WHERE "+colu_condi+" "+opera+" "+valor+"\n")
      this.relacionales(id,table,column,colu_condi,opera,valor);
    }
  }


  public relacionales(id:string,tabla: Table, nesdw: any[], colum_cond:string, opera:string, valor:any ){
    tabla.tuples.forEach((objeto) =>{
      const valores = Object.values(objeto);
      
          //obtiene indice columna WHERE condicion 
          const indice_condici = Object.keys(objeto).indexOf(colum_cond); 
        
          switch(opera){
            case '=':   
              if(valores[indice_condici]["value"] == valor){
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                console.log("-------------------------------------\n");
              }
              break;
            case '!=':
              if(valores[indice_condici]["value"] != valor){
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                console.log("-------------------------------------\n");
              }
              break;
            case '<':
              if(valores[indice_condici]["value"] < valor){
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                console.log("-------------------------------------\n");
              }
              break;
            case '<=':
              if(valores[indice_condici]["value"] <= valor){
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                console.log("-------------------------------------\n");
              }
              break;
            case '>':
              if(valores[indice_condici]["value"] > valor){
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                console.log("-------------------------------------\n");
              }
              break;
            case '>=':
              if(valores[indice_condici]["value"] >= valor){
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                console.log("-------------------------------------\n");
              }
              break;
          } //finaliza switch
        
      
    });
  }
  //SELECT * WHERE RELACIONALES
  public where_all_rela(id: string, column: string, opera: string, valor: any){
    const contextGlobal = this.getGlobal();
    if(contextGlobal.tables.has(id.toLowerCase())) {
      const table = contextGlobal.tables.get(id.toLowerCase())!;
      const nesdw = table.fields.map(literal => literal.value);
      console.log("\nRESULTADO DE CONSULTA SELECT * FROM "+id+" WHERE "+column+" "+opera+" "+valor+"\n")
      this.relacionales(id,table, nesdw, column, opera, valor);
      
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

    //Eliminar una tabla 
    public delete_table(id:string){
      let env: Context | null = this;
      if(env.tables.has(id.toLowerCase())){
        env.tables.delete(id.toLowerCase());
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
        value.tuples.forEach((field) => {
          console.log(field);
        });
      }
    }

    //Mostrar varibles
    public getVariables(){
      let env: Context | null = this;
      // console.log("Variables almacenadas: ")
      // for (const [key, value] of env.symbolTable){
      //   console.log(key+": "+value.valor);
      // }
      let contador: number = 0
      while(env.anterior != null){
        console.log("Variables en el contexto  "+contador+": ")
        for (const [key, value] of env.symbolTable){
          console.log(key+": "+value.valor);
        }
        contador ++;
          env = env?.anterior;
      }

    }

}