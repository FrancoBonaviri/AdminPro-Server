/*
    Ruta: /api/login 
*/

//Router config ->
const { Router } = require('express');
const router = Router();

// Middlewares ->
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');

// controllers ->
const { login } = require('../controllers/auth');

router.post( '/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos
], login )




module.exports = router;

