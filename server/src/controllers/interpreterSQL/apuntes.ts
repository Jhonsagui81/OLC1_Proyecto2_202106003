const {add_column} = require('./nonterminal/ddl/alterTable/add_column');
const {id} = require('./terminal/id');
const {aritmetica} = require('./terminal/aritmetica');
const {declaracion} = require('./nonterminal/declara_variables/default');
const {bloque} = require('./nonterminal/Bloques/bloque');
const {una_variable} = require('./nonterminal/declara_variables/unica');
const {varias_var} = require('./nonterminal/declara_variables/varias');
const {set} = require('./nonterminal/declara_variables/set');
const {simple_select} = require('./nonterminal/dml/select/simple_select');
const {short_select} = require('./nonterminal/dml/select/short_select');
const {where_all_relaci} = require('./nonterminal/dml/select/where_select');
const {where_column_relaci} = require('./nonterminal/dml/select/where_column_relaci');
const {where_all_logic} = require('./nonterminal/dml/select/where_all_logic');
const {where_colum_logic} = require('./nonterminal/dml/select/where_colum_logic');
