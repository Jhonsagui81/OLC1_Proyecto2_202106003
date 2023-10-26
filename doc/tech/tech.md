# **Proyecto 2**
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 1
### Sección C
| Nombre | Carnet | 
| --- | --- |
| Jhonatan Alexander Aguilar Reyes | 202106003 |
----
# **Manual Técnico**

## **Introducción** 
El proyecto consiste en el desarrollo de un interprete para el lenguaje de programación **QueryCrypter**. El interprete es capaz de leer un archivo de texto con extensión **.cp** y ejecutarlo. El interprete es capaz de ejecutar instrucciones y expresiones de un lenguaje nativo, tales como:

- Creacion de tablas 
- Inserccion de datos a tablas
- Consultas a las tablas
- Actualizacion de tablas
- Eliminacion de tablas
- Declaración de variables
- Asignación de variables
- Operaciones aritméticas
- Operaciones lógicas
- Operaciones relacionales
- Estructuras de control
- Funciones
- Instrucciones ciclicas
- Instrucciones de salto
- Instrucciones de entrada y salida
- Instrucciones de llamada a función
- Instrucciones de retorno de función
- Instrucciones de declaración de función

## **Requerimientos del Software**
- Sistema operativo Windows 10 o superior
- Navegador web Google Chrome
- Node.js
- NPM
- React.js
- Graphviz
- Typescript

## *Librerías utilizadas*
- [React.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Graphviz](https://graphviz.org/)
- [Jison](https://zaa.ch/jison/)
- [QuickChart GraphViz](https://quickchart.io/documentation/graphviz-api/)


## **Estructura del Código**
El proyecto fue desarrollado utilizando en su totalidad el framework para frontend React.js, el cual utiliza el lenguaje de programación Typescript. El proyecto se divide en dos carpetas principales, **server** y **client**. La carpeta **server** contiene el código fuente del interprete, mientras que la carpeta **client** contiene el código fuente de la aplicación web.

## **Análisis Léxico**
El análisis léxico es el proceso de reconocer los tokens de una cadena de
entrada. Para este proyecto se utilizó la herramienta JISON para generar el
análisis léxico. JISON es una herramienta que permite generar analizadores
léxicos a partir de expresiones regulares.
devuelve un objeto de la clase Symbol, que contiene el token y su valor.

## **Análisis Sintáctico**
El análisis sintáctico es el proceso de reconocer la estructura de una
cadena de entrada. Para este proyecto se utilizó la herramienta JISON para generar el análisis sintáctico.
## **JISON**
Jison es un generador de analizadores léxicos y sintácticos para Javascript. Jison toma una descripción de gramática, escrita en formato BNF, y produce un programa Javascript que construye un árbol de análisis para reconocer cadenas que coincidan con la gramática. Jison es un fork de Bison, y Bison es un fork de Yacc. Jison fue escrito por Zach Carter, y es mantenido por Zach Carter y otros colaboradores.

## **Patrón de diseño**
Para el desarrollo del interprete se utilizó el patrón de diseño **Patrón interprete**. El patrón interprete es un patrón de diseño de software que, dado un lenguaje, define una representación para su gramática junto con un intérprete del lenguaje. Se usa para definir un lenguaje para representar expresiones regulares que representen cadenas a buscar dentro de otras cadenas. Este patrón usa una clase para representar cada regla gramatical. El intérprete usa la representación para interpretar las sentencias del lenguaje. A continuación se muestra el diagrama de clases del patrón interprete utilizado para el desarrollo del interprete: 

![Alt text](image.png)


## **Gramática**
Para el desarrollo del interprete se utilizó una gramática libre de contexto, recursiva por la derecha (LR). La gramática fue desarrollada utilizando el lenguaje de programación Jison. A continuación se muestra la gramática en limpio utilizada para el desarrollo del interprete:

```
Terminales = {
    TK_PTCOMA, TK_BEGIN TK_END, TK_DECLARE, TK_DEFAULT, TK_SET, TK_ARROBA, TK_IDENTIFICADOR, TK_COMA, TK_PARIZQ
    TK_PUNTO, TK_PARDER, TK_DOSPUNTOS, TK_CORIZR, TK_CORDER, TK_LLAVEIZQ, TK_LLAVEDER, TK_IGUALACION, TK_DIFERENCIACION,
    TK_MENORQUE, TK_MAYORQUE, TK_ARROBA, TK_MAS, TK_MENOS, TK_POR, TK_DIV, TK_MODULO, TK_AND, TK_OR, TK_NOT, TK_TENTERO,
    TK_TDOUBLE, TK_TDATE, TK_TVARCHAR, TK_TBOOLEAN, TK_TRUE, TK_FALSE, TK_NULL, TK_CREATE, TK_ALTER, TK_ADD, TK_DROP, 
    TK_RENAME, TK_TO, TK_COLUMN, TK_TABLE, TK_INSERT, TK_INTO, TK_VALUES, TK_SELECT, TK_AS, TK_FROM, TK_WHERE, TK_UPDATE,
    TK_TRUNCATE, TK_DELETE, TK_PRINT, TK_BEGIN, TK_END, TK_DECLARE, TK_DEFAULT, TK_SET, TK_DOUBLE, TK_ENTERO, TK_DATE,
    TK_VARCHAR
}

No Terminales = {
    ini, instrucciones, instruccion_global, dml, ddl, declaracion, funciones, metodos, bloques, nativas, casteo, llamadas, 
    nativas, atriutos_variables, exp, tipos, crearTabla, alterTable, dropTable, atributoTabla, listaAtributosTabla,
    insertar, select , update, truncate, delete, lista_columnas, relacionales, logicos, lista_colum_update, 
    column_update, listaIDS, listaValores, valor, 
}

ini ->  instrucciones

instrucciones ->  instrucciones instruccion_global 
	| instruccion_global					

instruccion_global -> ddl   TK_PTCOMA                    
  | dml   TK_PTCOMA                     
  |declaracion TK_PTCOMA                        
  | bloques TK_PTCOMA     
  | nativas TK_PTCOMA    

bloques -> TK_BEGIN instrucciones TK_END 

instrucciones_locales -> instrucciones_locales instrucci_local   
  |instrucci_local 

instrucci_local -> bloques TK_PTCOMA                  
  |declaracion TK_PTCOMA             
  |dml TK_PTCOMA                     
  |nativas  TK_PTCOMA                         


declaracion -> TK_DECLARE atriutos_variables TK_DEFAULT exp           
  |TK_DECLARE atriutos_variables                        
  |TK_SET TK_ARROBA TK_IDENTIFICADOR TK_IGUALACION exp   

atriutos_variables -> TK_ARROBA TK_IDENTIFICADOR tipos 



ddl -> crearTabla 
  |alterTable
  |dropTable  

dropTable -> TK_DROP TK_TABLE atributoTabla  


alterTable -> TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_ADD atributoTabla   
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_DROP TK_COLUMN atributoTabla   
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_RENAME TK_TO atributoTabla    
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_RENAME TK_COLUMN atributoTabla TK_TO atributoTabla   

crearTabla -> TK_CREATE TK_TABLE TK_IDENTIFICADOR TK_PARIZQ listaAtributosTabla TK_PARDER 
  

listaAtributosTabla -> listaAtributosTabla TK_COMA atributoTabla 
  	| atributoTabla 


atributoTabla -> TK_IDENTIFICADOR tipos            
  | TK_IDENTIFICADOR


// DML
dml -> insertar  
  | select    
  | update    
  | truncate  
  | delete    


select -> TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR                                       
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR                                                
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp      
  |TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp   
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp
  |TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp      
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp    
  |TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp   



lista_columnas -> lista_columnas TK_COMA TK_IDENTIFICADOR      
  |TK_IDENTIFICADOR                          


update -> TK_UPDATE TK_IDENTIFICADOR TK_SET lista_colum_update TK_WHERE TK_IDENTIFICADOR relacionales exp

  |TK_UPDATE TK_IDENTIFICADOR TK_SET lista_colum_update TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp

  |TK_UPDATE TK_IDENTIFICADOR TK_SET lista_colum_update TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp



lista_colum_update -> lista_colum_update TK_COMA column_update    
  |column_update                                


column_update -> TK_IDENTIFICADOR TK_IGUALACION exp        


truncate -> TK_TRUNCATE TK_TABLE TK_IDENTIFICADOR       


delete -> TK_DELETE TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp  

  |TK_DELETE TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp

  |TK_DELETE TK_FROM TK_IDENTIFICADOR TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp





nativas ->  TK_PRINT exp    


insertar -> TK_INSERT TK_INTO TK_IDENTIFICADOR TK_PARIZQ listaIDS TK_PARDER TK_VALUES TK_PARIZQ listaValores TK_PARDER



listaIDS -> listaIDS TK_COMA TK_IDENTIFICADOR 
  | TK_IDENTIFICADOR 


listaValores ->  listaValores TK_COMA valor 
  | valor


exp -> valor              
  |exp TK_MAS exp    
  |exp TK_MENOS exp   
  |exp TK_POR exp     
  |exp TK_DIV exp     
  |exp TK_MODULO exp 
  |TK_MENOS valor     


valor -> TK_PARIZQ exp TK_PARDER 
  | TK_ENTERO 
  | TK_DOUBLE 
  | TK_DATE 
  | TK_VARCHAR 
  | TK_TRUE 
  | TK_FALSE 
  | TK_NULL 
  | TK_IDENTIFICADOR 


tipos -> TK_TENTERO     
  | TK_TDOUBLE     
  | TK_TDATE      
  | TK_TVARCHAR    
  | TK_TBOOLEAN    

relacionales -> TK_IGUALACION        
  |TK_DIFERENCIACION   
  |TK_MENORQUE          
  |TK_MENORQUE TK_IGUALACION     
  |TK_MAYORQUE         
  |TK_MAYORQUE TK_IGUALACION       

logicos ->TK_OR                
        |TK_AND              
```


