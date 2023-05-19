const { Router } = require('express');
const getPokemons = require("./getPokemons")
const getTypes = require("./getTypes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemon", getPokemons)
router.use("/types", getTypes)


module.exports = router;
