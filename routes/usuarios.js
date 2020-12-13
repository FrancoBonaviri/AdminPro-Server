/*
    Ruta: /api/usuarios 
*/

//Router config ->
const { Router } = require('express');
const router = Router();


//Controllers ->
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

// Middlewares ->
const { check } = require('express-validator');

// Personalized middlewares ->
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


//Obtiene todos los usuarios ->
router.get( '/', validarJWT, getUsuarios);

//Crea un usuario ->
router.post( '/', [
    check('nombre', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validarCampos
], crearUsuario );

//Actualizar usuario ->
router.put( '/:id', [
    validarJWT,
    check('nombre', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    validarCampos
], actualizarUsuario )

//Eliminar usuario ->
router.delete( '/:id', validarJWT, borrarUsuario );








module.exports = router;