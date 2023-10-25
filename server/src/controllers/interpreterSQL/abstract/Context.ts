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
      console.log("valor de ato: "+valor.value)
      let symbol = new Symbol(valor.value, id, valor.type);
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
          // this.getTables();
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
    let result = '';
    if(contextGlobal.tables.has(name.toLowerCase())) {
      const table = contextGlobal.tables.get(name.toLowerCase())!;
      try{
        const generateTable = (data:any, selectedColumns:any[]) => {
          const tableText = [];
          const headers = selectedColumns;
        
          // Genera los encabezados de la tabla
          const headerRow = headers.map((header) => header.padEnd(20));

          tableText.push(` ${headerRow.join('  ')}`);
         
        
          // Genera las filas de datos
          data.forEach((tuple:any) => {
            const rowData = headers.map((header) => {
              const value = tuple[header].value.toString();
              return value.padEnd(20);
            });
            tableText.push(` ${rowData.join(' ')}`);
           
          });
        
          // Retorna la tabla completa como una cadena de texto
          return tableText.join('\n');
        };
        result += generateTable(table.tuples, columns)
      } catch {
        result += 'Esta Tabla no contiene registros \n\n';
        return result;
      }
    }else{
      result += '->La tabla solicitada no existe'
    }
    return result; 
  }
  //short_SELECT
  public short_select(name: string){
    const contextGlobal = this.getGlobal();
    let result = ''; 
    console.log("-----------------------------------------------");
    if(contextGlobal.tables.has(name.toLowerCase())) {
      const table = contextGlobal.tables.get(name.toLowerCase())!;
      const nesdw = table.fields;
      
      try {
         //Inicia metodo para tabular resultado 
        const generate_table = (data:any) => {
          const tableTexto = [];
          const headers = Object.keys(data[0]);

          const headerRow = headers.map((header) => header.padEnd(20));

          tableTexto.push(`${headerRow.join('\t')}\t\t`);
        

          data.forEach((tuple:any) => {
            const rowData = headers.map((header) => {
              const value = tuple[header].value.toString();
              return value.padEnd(20);
            });
            tableTexto.push(`${rowData.join('\t')}\t\t`);
    
          });
          return tableTexto.join('\n');
        };
        result += generate_table(table.tuples)
      } catch (error){
        result += 'Esta Tabla no contiene registros \n\n';
        return result;
      }
     
      
     
    }else{
      result += '->La tabla solicitada no existe'
    }
    return result;
  }

  
  // SELECT [] WHERE REALACIONALES
  public where_column_rela(column:string[], id: string, colu_condi:string, opera: string, valor:any){
    const contexGlobal = this.getGlobal();
    let result = '';
    if(contexGlobal.tables.has(id.toLowerCase())) {
      const table = contexGlobal.tables.get(id.toLowerCase())!;
      const resuldt = this.relacionales(table,column,colu_condi,opera,valor);
      // lista con resultados => iterarla 
      try{
        const comClave = Object.keys(resuldt[0]);
        const clavesFiltro = comClave.filter(key => column.includes(key));

        function createTable(obj:any, keys: string[]){
          return keys.map(key => obj[key]);
        }
        result += clavesFiltro.join('\t') + '\n';
        resuldt.forEach(item => {
          result += createTable(item, clavesFiltro).join('\t')+'\n';
        });
      }catch{
        result = "No hubo coincidencia para la consulta\n\n"
      }  
      
    }else{
      result = "No existe la tabla que consulta\n\n";
    }
    return result;
  }

  //SELECT * WHERE RELACIONALES
  public where_all_rela(id: string, column: string, opera: string, valor: any){
    const contextGlobal = this.getGlobal();
    let result = '';
    if(contextGlobal.tables.has(id.toLowerCase())) {
      const table = contextGlobal.tables.get(id.toLowerCase())!;
      const nesdw = table.fields.map(literal => literal.value);
      const resuldt = this.relacionales(table, nesdw, column, opera, valor); 
      //lista con resultados -> iterarrla 

      try{
        const comClave = Object.keys(resuldt[0]);
        function createTable(obj:any, keys: string[]){
          return keys.map(key => obj[key]);
        }
        result += comClave.join('\t') + '\n';
        resuldt.forEach(item => {
          result += createTable(item, comClave).join('\t')+'\n';
        });
      }catch{
        result = "No hubo coincidencia para la consulta\n\n"
      }    
    }else {
      result = "No existe la tabla que consulta\n\n";
    }
    return result;
  }

  //SELECT * WHERE relacion LOGIC relacion
    public where_all_logic(id:string, cond1:string, oper1:string, valor1:any, logic:string, cond2:string, oper2:string, valor2:any){
    const contextGlobal = this.getGlobal();
    let result = '';
    if(contextGlobal.tables.has(id.toLowerCase())) {
      const table = contextGlobal.tables.get(id.toLowerCase())!;
      const nesdw = table.fields.map(literal => literal.value);
      //console.log("\nRESULTADO DE CONSULTA SELECT * FROM "+id+" WHERE "+column+" "+opera+" "+valor+"\n")
      const result1 = this.relacionales(table, nesdw, cond1, oper1, valor1);
      const result2 = this.relacionales(table, nesdw, cond2, oper2, valor2);

      switch(logic){
        case 'AND':
          const new_list = result1.filter(objeto1 => {
            return result2.some(objeto2 => {
              return Object.keys(objeto1).every(clave => objeto2.hasOwnProperty(clave) && objeto2[clave] == objeto1[clave]);
            });
          });
          //Inicia metodo para tabular resultado 
          try{
            const comClave = Object.keys(new_list[0]);
            function createTable(obj:any, keys: string[]){
              return keys.map(key => obj[key]);
            }
            result += comClave.join('\t') + '\n';
            new_list.forEach(item => {
              result += createTable(item, comClave).join('\t')+'\n';
            });
          }catch{
            result = "No hubo coincidencia para la consulta\n\n"
          }
           
          console.log(new_list);
          break;
        case 'OR':
          const new_lista = result1.concat(result2).filter((objeto, indice, lista) => {
            return lista.findIndex(obj => JSON.stringify(obj) === JSON.stringify(objeto)) === indice;
          });
          
          //inicia metodo result 
          try{
            const comClave = Object.keys(new_lista[0]);
            function createTable(obj:any, keys: string[]){
              return keys.map(key => obj[key]);
            }
            result += comClave.join('\t') + '\n';
            new_lista.forEach(item => {
              result += createTable(item, comClave).join('\t')+'\n';
            });
          }catch{
            result = "No hubo coincidencia para la consulta\n\n";
          }

          break;
      } //termina switch
      
    }else{
      result = "No existe la tabla que consulta\n\n";
    }
    return result;
    }

    public where_column_logic(columnas: [],id:string, cond1:string, oper1:string, valor1:any, logic:string, cond2:string, oper2:string, valor2:any){
    const contextGlobal = this.getGlobal();
    let result = '';
    if(contextGlobal.tables.has(id.toLowerCase())) {
      const table = contextGlobal.tables.get(id.toLowerCase())!;
      const nesdw = table.fields.map(literal => literal.value);
      //console.log("\nRESULTADO DE CONSULTA SELECT * FROM "+id+" WHERE "+column+" "+opera+" "+valor+"\n")
      const result1 = this.relacionales(table, columnas, cond1, oper1, valor1);
      const result2 = this.relacionales(table, columnas, cond2, oper2, valor2);

      switch(logic){
        case 'AND':
          const new_list = result1.filter(objeto1 => {
            return result2.some(objeto2 => {
              return Object.keys(objeto1).every(clave => objeto2.hasOwnProperty(clave) && objeto2[clave] == objeto1[clave]);
            });
          });

          try{
            const comClave = Object.keys(new_list[0]);
            function createTable(obj:any, keys: string[]){
              return keys.map(key => obj[key]);
            }
            result += comClave.join('\t') + '\n';
            new_list.forEach(item => {
              result += createTable(item, comClave).join('\t')+'\n';
            });
          }catch{
            result = "No hubo coincidencia para la consulta\n\n"
          } 
          break;
        case 'OR':
          const new_lista = result1.concat(result2).filter((objeto, indice, lista) => {
            return lista.findIndex(obj => JSON.stringify(obj) === JSON.stringify(objeto)) === indice;
          });
          
          try{
            const comClave = Object.keys(new_lista[0]);
            function createTable(obj:any, keys: string[]){
              return keys.map(key => obj[key]);
            }
            result += comClave.join('\t') + '\n';
            new_lista.forEach(item => {
              result += createTable(item, comClave).join('\t')+'\n';
            });
          }catch{
            result = "No hubo coincidencia para la consulta\n\n";
          }
          break;
      }
      
    }else{
      result = "No existe la tabla que consulta\n\n";
    }
    return result;
    }

  //UPDATE RELACIONALES 
    public update_relacionales(id:string, fields: any[], column_condi:string, opera:string, valor: any){
    // fields.forEach((con) => {
        // console.log(con.valor+": "+con.id);   //Jhonatan Reyes: Nombre
    // });
    const contextGlobal = this.getGlobal();
    if(contextGlobal.tables.has(id.toLowerCase())) {
      const table = contextGlobal.tables.get(id.toLowerCase())!;
      const nesdw = table.fields.map(literal => literal.value);

      const result1 = this.relacionales(table, nesdw, column_condi, opera, valor);

      for (const nueva_tu of result1){
        for( let i = table.tuples.length -1; i>=0; i--){
          let found = false;
          for(const clave in nueva_tu){
            if(nueva_tu.hasOwnProperty(clave)) {
              if(table.tuples[i][clave]["value"] !== nueva_tu[clave]) {
                found = false;
                break;
              }
              found = true;
            }
          }
          if (found) {
            fields.forEach((con) =>{
              table.tuples[i][con.id]["value"] = con.valor;
            });  
          }
        }
      }

      
      console.log("Actualizado");
    }
    }
    //UPDATE LOGIC
    public update_logic(id:string, fields: any[], cond1:string, oper1:string, valor1:any, logic:string, cond2:string, oper2:string, valor2:any){
    const contextGlobal = this.getGlobal();
    if(contextGlobal.tables.has(id.toLowerCase())) {
      const table = contextGlobal.tables.get(id.toLowerCase())!;
      const nesdw = table.fields.map(literal => literal.value);
      //console.log("\nRESULTADO DE CONSULTA SELECT * FROM "+id+" WHERE "+column+" "+opera+" "+valor+"\n")
      const result1 = this.relacionales(table, nesdw, cond1, oper1, valor1);
      const result2 = this.relacionales(table, nesdw, cond2, oper2, valor2);

      switch(logic){
        case 'AND':
          //Nueva lista con las dos condiciones aplicadas 
          const new_list = result1.filter(objeto1 => {
            return result2.some(objeto2 => {
              return Object.keys(objeto1).every(clave => objeto2.hasOwnProperty(clave) && objeto2[clave] == objeto1[clave]);
            });
          });

          //ACTUALIZACION de los valores 
          for (const nueva_tu of new_list){
            for( let i = table.tuples.length -1; i>=0; i--){
              let found = false;
              for(const clave in nueva_tu){
                if(nueva_tu.hasOwnProperty(clave)) {
                  if(table.tuples[i][clave]["value"] !== nueva_tu[clave]) {
                    found = false;
                    break;
                  }
                  found = true;
                }
              }
              if (found) {
                fields.forEach((con) =>{
                  table.tuples[i][con.id]["value"] = con.valor;
                });  
              }
            }
          }
          console.log("Actualizado");
          break;
        case 'OR':
           //Nueva lista con las dos condiciones aplicadas
          const new_lista = result1.concat(result2).filter((objeto, indice, lista) => {
            return lista.findIndex(obj => JSON.stringify(obj) === JSON.stringify(objeto)) === indice;
          });

          //ACTUALIZACION de los valores 
          for (const nueva_tu of new_lista){
            for( let i = table.tuples.length -1; i>=0; i--){
              let found = false;
              for(const clave in nueva_tu){
                if(nueva_tu.hasOwnProperty(clave)) {
                  if(table.tuples[i][clave]["value"] !== nueva_tu[clave]) {
                    found = false;
                    break;
                  }
                  found = true;
                }
              }
              if (found) {
                fields.forEach((con) =>{
                  table.tuples[i][con.id]["value"] = con.valor;
                });  
              }
            }
          }
          console.log("Actualizado");
          break;
      }


    } 
    }

    //TRUNCATE TABLE
    public truncate_table(id:string){
      const contextGlobal = this.getGlobal();
      if(contextGlobal.tables.has(id.toLowerCase())) {
        const table = contextGlobal.tables.get(id.toLowerCase())!;
        table.tuples.splice(0, table.tuples.length);
        //console.log("\nRESULTADO DE CONSULTA SELECT * FROM "+id+" WHERE "+column+" "+opera+" "+valor+"\n")
      }
    }

    //DELETE relacionales
    public delete_relacionales(id:string, cond1:string, oper:string, valor: any){
      const contexGlobal = this.getGlobal();
      if(contexGlobal.tables.has(id.toLowerCase())){
        const table = contexGlobal.tables.get(id.toLowerCase())!;
        const nesdw = table.fields.map(literal => literal.value);

        const result1 = this.relacionales(table, nesdw, cond1, oper, valor);

        for(const nueva_tu of result1){
          for(let i = table.tuples.length -1; i >= 0; i--){
            let found = false;
            for(const clave in nueva_tu){
              if(nueva_tu.hasOwnProperty(clave)){
                if(table.tuples[i][clave]['value'] !== nueva_tu[clave]){
                  found = false;
                  break;
                }
                found = true;
              }
            }
            if(found){
              table.tuples.splice(i, 1);
            }
          }
        }
      }
    }

    //DELETE Logic 
    public delete_logicos(id:string, cond1:string, oper1:string, valor1:any, logic:string, cond2:string, oper2:string, valor2:string){
      const contextGlobal = this.getGlobal();
      if(contextGlobal.tables.has(id.toLowerCase())) {
        const table = contextGlobal.tables.get(id.toLowerCase())!;
        const nesdw = table.fields.map(literal => literal.value);
        //console.log("\nRESULTADO DE CONSULTA SELECT * FROM "+id+" WHERE "+column+" "+opera+" "+valor+"\n")
        const result1 = this.relacionales(table, nesdw, cond1, oper1, valor1);
        const result2 = this.relacionales(table, nesdw, cond2, oper2, valor2);

        switch(logic){
          case 'AND':
            //Nueva lista con las dos condiciones aplicadas 
            const new_list = result1.filter(objeto1 => {
              return result2.some(objeto2 => {
                return Object.keys(objeto1).every(clave => objeto2.hasOwnProperty(clave) && objeto2[clave] == objeto1[clave]);
              });
            });
  
            //ACTUALIZACION de los valores 
            for(const nueva_tu of new_list){
              for(let i = table.tuples.length -1; i >= 0; i--){
                let found = false;
                for(const clave in nueva_tu){
                  if(nueva_tu.hasOwnProperty(clave)){
                    if(table.tuples[i][clave]['value'] !== nueva_tu[clave]){
                      found = false;
                      break;
                    }
                    found = true;
                  }
                }
                if(found){
                  table.tuples.splice(i, 1);
                }
              }
            }
            
            console.log("Eliminado");
            break;
          case 'OR':
             //Nueva lista con las dos condiciones aplicadas
            const new_lista = result1.concat(result2).filter((objeto, indice, lista) => {
              return lista.findIndex(obj => JSON.stringify(obj) === JSON.stringify(objeto)) === indice;
            });
  
            //ACTUALIZACION de los valores 
            for(const nueva_tu of new_lista){
              for(let i = table.tuples.length -1; i >= 0; i--){
                let found = false;
                for(const clave in nueva_tu){
                  if(nueva_tu.hasOwnProperty(clave)){
                    if(table.tuples[i][clave]['value'] !== nueva_tu[clave]){
                      found = false;
                      break;
                    }
                    found = true;
                  }
                }
                if(found){
                  table.tuples.splice(i, 1);
                }
              }
            }
            
            console.log("Eliminado");
            break;
        }
      }
    }


    //METODO RELACIONALES
    public relacionales(tabla: Table, nesdw: any[], colum_cond:string, opera:string, valor:any ): { [key:string]:any}[] {
    const tuples: { [key: string]: any }[] = []; 
    tabla.tuples.forEach((objeto) =>{
      const valores = Object.values(objeto);
      
          //obtiene indice columna WHERE condicion 
          const indice_condici = Object.keys(objeto).indexOf(colum_cond); 
        
          switch(opera){
            case '=':   
              if(valores[indice_condici]["value"] == valor){
                const result: {[key: string]: any} = {};
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit); 
                  result[lit] = valores[indice]["value"];
                  // console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                // console.log("-------------------------------------\n");
                tuples.push(result);
                
              }
              break;
            case '!=':
              if(valores[indice_condici]["value"] != valor){
                const result: {[clave:string]:any} = {};
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  result[lit] = valores[indice]["value"];
                  //console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                //console.log("-------------------------------------\n");
                tuples.push(result);
                
              }
              break;
            case '<':
              if(valores[indice_condici]["value"] < valor){
                const result: {[clave:string]:any} = {};
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  result[lit] = valores[indice]["value"];
                  // console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                // console.log("-------------------------------------\n");
                tuples.push(result);
                
              }
              break;
            case '<=':
              if(valores[indice_condici]["value"] <= valor){
                const result: {[clave:string]:any} = {};
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  result[lit] = valores[indice]["value"];
                  // console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                // console.log("-------------------------------------\n");
                tuples.push(result);
                
              }
              break;
            case '>':
              if(valores[indice_condici]["value"] > valor){
                const result: {[clave:string]:any} = {};
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  result[lit] = valores[indice]["value"];
                  // console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                // console.log("-------------------------------------\n");
                tuples.push(result);
                
              }
              break;
            case '>=':
              if(valores[indice_condici]["value"] >= valor){
                const result: {[clave:string]:any} = {};
                nesdw.forEach((lit) => {
                  const indice = Object.keys(objeto).indexOf(lit);  
                  result[lit] = valores[indice]["value"];
                  // console.log(`${lit}: ${valores[indice]["value"]}`);
                });
                // console.log("-------------------------------------\n");
                tuples.push(result);
              
              }
              break;
          } //finaliza switch
        
      
    });
    return tuples;
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