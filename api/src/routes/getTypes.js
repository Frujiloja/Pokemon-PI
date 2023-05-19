const { Router } = require('express');
const getTypes = Router();
const { getTypeHandler } = require("../handlers/typesHandlers")

getTypes.get("/",getTypeHandler)

module.exports = getTypes;