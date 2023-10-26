/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%

[ \r\t]+            {}                      // espacio en blanco
\n                  {}                      // salto de linea
(\-\-).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea


// simbolos reservados
";"                 return 'TK_PTCOMA';
"("                 return 'TK_PARIZQ';
"."                 return 'TK_PUNTO';
")"                 return 'TK_PARDER';
":"                 return 'TK_DOSPUNTOS';
","                 return 'TK_COMA';
"["                 return 'TK_CORIZR';
"]"                 return 'TK_CORDER';
"{"                 return 'TK_LLAVEIZQ';
"}"                 return "TK_LLAVEDER";

// ------> Relacionales 
"="                 return 'TK_IGUALACION';
"!="                return 'TK_DIFERENCIACION';
"<"                 return 'TK_MENORQUE';
">"                 return 'TK_MAYORQUE';
"@"                 return 'TK_ARROBA';

// -------> Operadores aritmeticos
"+"                 return "TK_MAS";
"-"                 return "TK_MENOS";
"*"                 return "TK_POR";
"/"                 return "TK_DIV";
"%"                 return "TK_MODULO";

// --------> Operadores logicos
"AND"               return "TK_AND";
"OR"                return "TK_OR";
"NOT"               return "TK_NOT"; 

// tipos de variables
"int"               return 'TK_TENTERO';
"double"            return 'TK_TDOUBLE';
"date"              return 'TK_TDATE';
"varchar"           return 'TK_TVARCHAR';
"boolean"           return 'TK_TBOOLEAN';

"true"              return 'TK_TRUE';
"false"             return 'TK_FALSE';
"null"              return 'TK_NULL';

// ------------>   ddl
"create"          return 'TK_CREATE';
"alter"           return 'TK_ALTER';
"add"             return 'TK_ADD';
"drop"            return 'TK_DROP';
"rename"          return 'TK_RENAME';
"to"              return 'TK_TO';
"column"          return 'TK_COLUMN';
"table"           return 'TK_TABLE';

// -------------> dml
"insert"      return 'TK_INSERT';
"into"        return 'TK_INTO';
"values"      return 'TK_VALUES';
"select"      return 'TK_SELECT';
"as"          return 'TK_AS';
"from"        return 'TK_FROM';
"where"       return 'TK_WHERE';
"update"      return 'TK_UPDATE';
"truncate"  	return 'TK_TRUNCATE';
"delete"      return 'TK_DELETE';

// --------------> nativas
"PRINT"       return 'TK_PRINT';
"lower"       return 'TK_LOWER'; 
"upper"       return 'TK_UPPER'; 
"round"       return 'TK_ROUND'; 
"len"         return 'TK_LEN';
"typeof"      return 'TK_TYPEOF';

// -------------> bloques
"begin"       return 'TK_BEGIN';
"end"         return 'TK_END';

// -----------> Declaracion variables
"declare"         return 'TK_DECLARE';
"default"         return 'TK_DEFAULT';
"set"             return 'TK_SET';

[a-zA-Z][a-zA-Z0-9_]*   return 'TK_IDENTIFICADOR';
[0-9]+\.[0-9]+\b     return 'TK_DOUBLE';
[0-9]+               return 'TK_ENTERO';
^'(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])'$      return 'TK_DATE';
["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'TK_VARCHAR';}


<<EOF>>                 return 'EOF';

.                       {
                          console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                          Errors.addError("Lexico", `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column);
                        }
/lex

%{
  //Errores 
  const {Errors} = require('./tools/Errors');
  // importar tipos
	const {Type} = require('./abstract/Return');
	const {FieldExpression} = require('./terminal/FieldExpression');
	const {LiteralExpression} = require('./terminal/LiteralExpression');

  //DDL
	const {CreateTableExpression} = require('./nonterminal/ddl/createTable/CreateTableExpression');
  const {add_column} = require('./nonterminal/ddl/alterTable/add_column');
  const {delete_column} =  require('./nonterminal/ddl/alterTable/delete_column');
  const {rename_to} = require("./nonterminal/ddl/alterTable/renameto");
  const {rename_column} = require("./nonterminal/ddl/alterTable/rename_column");
  const {delete_table} = require("./nonterminal/ddl/dropTable/deleteTable");

  //DML
  const {InsertExpression} = require('./nonterminal/dml/insert/InsertExpressions');
  const {simple_select} = require('./nonterminal/dml/select/simple_select');
  const {short_select} = require('./nonterminal/dml/select/short_select');
  const {where_all_relaci} = require('./nonterminal/dml/select/where_select');
  const {where_column_relaci} = require('./nonterminal/dml/select/where_column_relaci');
  const {where_all_logic} = require('./nonterminal/dml/select/where_all_logic');
  const {where_colum_logic} = require('./nonterminal/dml/select/where_colum_logic');
  const {where_all_not} = require('./nonterminal/dml/select/where_all_not');
  const {where_column_not} = require('./nonterminal/dml/select/where_column_not');
  const {columna_update} = require('./nonterminal/dml/update/colum_update');
  const {update_relacional} = require('./nonterminal/dml/update/update_relacional');
  const {update_logic} = require('./nonterminal/dml/update/update_logic');
  const {update_logic_not} = require('./nonterminal/dml/update/update_not');
  const {truncate_table} = require('./nonterminal/dml/truncate/truncate_table');
  const {delete_relacional} = require('./nonterminal/dml/delete/delete_relaciona');
  const {delete_logic} = require('./nonterminal/dml/delete/delete_logic');
  const {delete_not} = require('./nonterminal/dml/delete/delete_not');

  //bloques
  const {bloque} = require('./nonterminal/Bloques/bloque');

  //Declaracion variables
  const {id} = require('./terminal/id');
  const {aritmetica} = require('./terminal/aritmetica');
  const {declaracion} = require('./nonterminal/declara_variables/default');
  const {una_variable} = require('./nonterminal/declara_variables/unica');
  const {set} = require('./nonterminal/declara_variables/set');
  const {varias_var} = require('./nonterminal/declara_variables/varias');

  //Nativas 
  const {Print} = require('./nonterminal/nativas/print');
  const {Lower} = require('./nonterminal/nativas/lower');
  const {Upper} = require('./nonterminal/nativas/upper'); 
  const {Round} = require('./nonterminal/nativas/round');
  const {Len} = require('./nonterminal/nativas/len');
  const {Truncate} = require('./nonterminal/nativas/truncate');
  const {Typeof} = require('./nonterminal/nativas/typeof'); 

%}

// ------> Precedencia
%left 'TK_OR'
%left 'TK_ADD'
%right 'TK_NOT'
%left 'TK_IGUALACION' 'TK_DIFERENCIACION' 'TK_MENORQUE' 'TK_MENORIGUAL' 'TK_MAYORQUE' 'TK_MAYORIGUAL'
%left 'TK_MAS' 'TK_MENOS'
%left 'TK_POR' 'TK_DIV' 'TK_MODULO'
%right UMENOS

%start ini
%% /* Definición de la gramática */
/* CREATE TABLE Clientes ( 
	ID_Cliente INT,
	Nombre VARCHAR,
	CorreoElectronico VARCHAR
);
*/
ini
	: instrucciones EOF {return $1;}

;

instrucciones
	: instrucciones instruccion_global 	{ $1.push($2); $$ = $1; }
	| instruccion_global					{ $$ = [$1]; }
;

instruccion_global
	: ddl   TK_PTCOMA                     { $$ = $1; }
	| dml   TK_PTCOMA                     { $$ = $1; }
  //| funciones TK_PTCOMA                 { $$ = $1; }
  //| metodos TK_PTCOMA                   { $$ = $1; }
  | bloques TK_PTCOMA     { $$ = $1; }
  | nativas TK_PTCOMA     { $$ = $1; }
	| error TK_PTCOMA
  	{   
      console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
      Errors.addError("Sintactico", `El caracter ${yytext} no pertenece al lenguaje`, this._$.first_line, this._$.first_column);
    }
;

bloques
  : TK_BEGIN instrucciones_locales TK_END  { $$ = new bloque(@1.first_line, @1.first_column, $2); }
;

instrucciones_locales
  :instrucciones_locales instrucci_local   {  $$ = $1; $$.push($2); }
  |instrucci_local  { $$ = []; $$.push($1); }
;

instrucci_local
  :bloques TK_PTCOMA                  { $$ = $1; }
  |declaracion TK_PTCOMA              { $$ = $1; }
  |dml TK_PTCOMA                      { $$ = $1; }
  //|casteo
  //|llamadas
  |nativas  TK_PTCOMA                          { $$ = $1; }
  //|sentencias_control
  //|sebtencias_ciclicas
  | error TK_PTCOMA
  	{   
      console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
      Errors.addError("Sintactico", `El caracter ${yytext} no pertenece al lenguaje`, this._$.first_line, this._$.first_column);
    }
;

declaracion
  :TK_DECLARE atriutos_variables TK_DEFAULT exp           { $$ = new declaracion(@1.first_line, @1.first_column, $2,$4); }
  |TK_DECLARE atriutos_variables                          { $$ = new una_variable(@1.first_line, @1.first_column, $2 ); }
  //|TK_DECLARE lista_atributos_var                         { $$ = new varias_var(@1.first_line, @1.first_column, $2); }
  |TK_SET TK_ARROBA TK_IDENTIFICADOR TK_IGUALACION exp    { $$ = new set(@1.first_line, @1.first_column, $3, $5); }
;

//lista_atributos_var
//	: lista_atributos_var TK_COMA atriutos_variables { $$ = $1; $$.push($3);   }
//  	| atriutos_variables { $$ = []; $$.push[$1]; }
//;

atriutos_variables
  : TK_ARROBA TK_IDENTIFICADOR tipos  { $$ = new FieldExpression(@1.first_line, @1.first_column,$2, $3); }
;


ddl
  :crearTabla { $$ = $1; }
  |alterTable { $$ = $1; }
  |dropTable  { $$ = $1; }
;

dropTable
  :TK_DROP TK_TABLE atributoTabla   {$$ = new delete_table(@1.first_line, @1.first_column, $3); }
;

alterTable
  :TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_ADD atributoTabla    {$$ = new add_column(@1.first_line, @1.first_column, $3, $5); }
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_DROP TK_COLUMN atributoTabla   {$$ = new delete_column(@1.first_line, @1.first_column, $3, $6); } 
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_RENAME TK_TO atributoTabla     {$$ = new rename_to(@1.first_line, @1.first_column, $3, $6); }
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_RENAME TK_COLUMN atributoTabla TK_TO atributoTabla    {$$ = new rename_column(@1.first_line, @1.first_column, $3, $6, $8); }
;

crearTabla
  : TK_CREATE TK_TABLE TK_IDENTIFICADOR TK_PARIZQ listaAtributosTabla TK_PARDER 
  { $$ = new CreateTableExpression(@1.first_line, @1.first_column,$3, $5); }
;

listaAtributosTabla
	: listaAtributosTabla TK_COMA atributoTabla { $1.push($3); $$ = $1;  }
  	| atributoTabla { $$ = [$1]; }
;

atributoTabla
  : TK_IDENTIFICADOR tipos            { $$ = new FieldExpression(@1.first_line, @1.first_column,$1, $2); }
  | TK_IDENTIFICADOR {$$ = $1; }
;

// DML
dml
  : insertar  { $$ = $1; }
  | select    { $$ = $1; }
  | update    { $$ = $1; }
  | truncate  { $$ = $1; }
  | delete    { $$ = $1; }
;

select
  :TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR                                            { $$ = new simple_select(@1.first_line, @1.first_column, $2, $4 ); }
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR                                                    { $$ = new short_select(@1.first_line, @1.first_column, $4);  }
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp         { $$ = new where_all_relaci(@1.first_line, @1.first_column, $4, $6, $7, $8);  }
  // TK_where TK_PARIZQ select TK_PARDER relacionales exp
  // TK_where TK_IDENTIFICADOR relacionales TK_PARIZQ select TK_PARDER
  // TK_where TK_PARIZQ select TK_PARDER relacionales TK_PARIZQ select TK_PARDER
  |TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp   
  { $$ = new where_column_relaci(@1.first_line, @1.first_column, $2, $4, $6, $7, $8 ); }
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp
  { $$ = new where_all_logic(@1.first_line, @1.first_column, $4, $6, $7, $8, $9, $10, $11, $12); }
  |TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp      
  { $$ = new where_colum_logic(@1.first_line, @1.first_column, $2, $4, $6, $7, $8, $9, $10, $11, $12  ); }
  |TK_SELECT TK_POR TK_FROM TK_IDENTIFICADOR TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp    
  { $$ = new where_all_not(@1.first_line, @1.first_column, $4, $7, $8, $9 );  }
  |TK_SELECT lista_columnas TK_FROM TK_IDENTIFICADOR TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp   
  { $$ = new where_column_not(@1.first_line, @1.first_column, $2, $4, $7, $8, $9 );  }
;

lista_columnas
  :lista_columnas TK_COMA TK_IDENTIFICADOR      { $$ = $1; $$.push($3); }
  |TK_IDENTIFICADOR                             { $$ = []; $$.push($1); }
;

update
  :TK_UPDATE TK_IDENTIFICADOR TK_SET lista_colum_update TK_WHERE TK_IDENTIFICADOR relacionales exp
  { $$ = new update_relacional(@1.first_line, @1.first_column, $2, $4, $6, $7, $8); }
  |TK_UPDATE TK_IDENTIFICADOR TK_SET lista_colum_update TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp
  { $$ = new update_logic(@1.first_line, @1.first_column, $2, $4, $6, $7,$8,$9, $10, $11, $12); }
  |TK_UPDATE TK_IDENTIFICADOR TK_SET lista_colum_update TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp
  { $$ = new update_logic_not(@1.first_line, @1.first_column, $2, $4, $7, $8, $9); }
;

lista_colum_update
  :lista_colum_update TK_COMA column_update     { $$ = $1; $$.push($3); }
  |column_update                                { $$ = []; $$.push($1); }
;

column_update
  :TK_IDENTIFICADOR TK_IGUALACION exp         { $$ = new columna_update(@1.first_line, @1.first_column, $1, $3); }
;

truncate
  :TK_TRUNCATE TK_TABLE TK_IDENTIFICADOR        {$$ = new truncate_table(@1.first_line, @1.first_column, $3 ); }
;

delete
  :TK_DELETE TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp  
  { $$ = new delete_relacional(@1.first_line, @1.first_column, $3, $5, $6, $7); }
  |TK_DELETE TK_FROM TK_IDENTIFICADOR TK_WHERE TK_IDENTIFICADOR relacionales exp logicos TK_IDENTIFICADOR relacionales exp
  { $$ = new delete_logic(@1.first_line, @1.first_column, $3, $5, $6, $7, $8, $9, $10, $11); }
  |TK_DELETE TK_FROM TK_IDENTIFICADOR TK_WHERE TK_NOT TK_IDENTIFICADOR relacionales exp
  { $$ = new delete_not(@1.first_line, @1.first_column, $3, $6, $7, $8); }
;



nativas
  :  TK_PRINT exp    
  { $$ = new Print(@1.first_line, @1.first_column, $2); }
  | TK_SELECT TK_LOWER TK_PARIZQ exp TK_PARDER   
  {$$ = new Lower(@1.first_line, @1.first_column, $4); }
  | TK_SELECT TK_UPPER TK_PARIZQ exp TK_PARDER
  {$$ = new Upper(@1.first_line, @1.first_column, $4); }
  | TK_SELECT TK_ROUND TK_PARIZQ exp TK_COMA TK_ENTERO TK_PARDER
  {$$ = new Round(@1.first_line, @1.first_column, $4, $6 ); }
  | TK_SELECT TK_LEN TK_PARIZQ exp TK_PARDER
  {$$ = new Len(@1.first_line, @1.first_column, $4); }
  |TK_SELECT TK_TRUNCATE TK_PARIZQ exp TK_COMA TK_ENTERO TK_PARDER
  {$$ = new Truncate(@1.first_line, @1.first_column, $4, $6); }
  |TK_SELECT TK_TYPEOF TK_PARIZQ exp TK_PARDER
  {$$ = new Typeof(@1.first_line, @1.first_column, $4); }
;

insertar
	: TK_INSERT TK_INTO TK_IDENTIFICADOR TK_PARIZQ listaIDS TK_PARDER TK_VALUES TK_PARIZQ listaValores TK_PARDER
  	{ $$ = new InsertExpression(@1.first_line, @1.first_column,$3, $5,$9); }
;

listaIDS
  : listaIDS TK_COMA TK_IDENTIFICADOR { $1.push($3); $$ = $1;  }
  | TK_IDENTIFICADOR { $$ = [$1]; }
;

listaValores
  : listaValores TK_COMA valor { $1.push($3); $$ = $1;  }
  | valor { $$ = [$1]; }
;

exp 
  :valor              { $$ = $1; }
  |exp TK_MAS exp     { $$ = new aritmetica(@1.first_line, @1.first_column, $1, '+', $3 ); }
  |exp TK_MENOS exp   { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "-", $3 ); }
  |exp TK_POR exp     { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "*", $3 ); }
  |exp TK_DIV exp     { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "/", $3 ); }
  |exp TK_MODULO exp  { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "%", $3 ); }
  |TK_MENOS valor     { $$ = new LiteralExpression(@1.first_line, @1.first_column, $2, Type.NEGATIVE); }
;

valor
  : TK_PARIZQ exp TK_PARDER {$$ = $2;}
  | TK_ENTERO { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.INT); }
  | TK_DOUBLE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.DOUBLE); }
  | TK_DATE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.DATE); }
  | TK_VARCHAR { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.VARCHAR); }
  | TK_TRUE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.BOOLEAN);}
  | TK_FALSE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.BOOLEAN); }
  | TK_NULL { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.NULL); }
  | TK_IDENTIFICADOR  { $$ = new id(@1.first_line, @1.first_column,$1); }
;

tipos
  : TK_TENTERO      { $$ = Type.INT; }
  | TK_TDOUBLE      { $$ = Type.DOUBLE; }
  | TK_TDATE        { $$ = Type.DATE; }
  | TK_TVARCHAR     { $$ = Type.VARCHAR; }
  | TK_TBOOLEAN     { $$ = Type.BOOLEAN; }
;

relacionales
  :TK_IGUALACION        { $$ = $1; }
  |TK_DIFERENCIACION    { $$ = $1; }
  |TK_MENORQUE          { $$ = $1; }
  |TK_MENORQUE TK_IGUALACION        { $$ = $1+$2; }
  |TK_MAYORQUE          { $$ = $1; }
  |TK_MAYORQUE TK_IGUALACION        { $$ = $1+$2; }
;

logicos
  :TK_OR                { $$ = $1; }
  |TK_AND               { $$ = $1; }
;

