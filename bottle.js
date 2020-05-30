// localhost:5432

const pg = require('pg-promise')
const Bottle = require("bottlejs");


Bottle.config.strict = true;
const bottle = new Bottle()