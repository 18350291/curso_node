const { request, response } = require("express");
const pool = require ("../db/conexion");
const usuariosQueries = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;

    desde = parseInt(desde);
    limite = parseInt(limite);

    if (!Number.isInteger(limite) || !Number.isInteger(desde)){
        res.status(400).json({ msg: "NOse puede realizar esta consulta."});
        return;
    }

    let conn;

    try{
        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries
            .selectUsuarios, [
                desde, 
                limite,
            ]); 
        res.json({usuarios})
    }catch(error){
        console.log(error);
        res
            .status(500)
            .json({msg:"Por favor contacte al administrador. ", error});
    }finally{
        if (conn) conn.end();
    }

    res.json({ msg: "Hola a todos desde GET" });
};

const usuariosPost = async (req = request, res = response) => {
    const { nombre, email, password, status = 1 }= req.body;
    
    let conn;

    try{
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(password, salt);

        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.insertUsuario,[
            nombre, 
            email,
            passwordHash, 
            status
        ]); 
        res.json({usuarios})
    }catch(error){
        console.log(error);
        res
            .status(500)
            .json({msg:"Por favor contacte al administrador. ", error});
    }finally{
        if (conn) conn.end();
    }
 
};

const usuariosPut = async (req = request, res = response) => {
    const { email } = req.query;
    const { nombre, status } = req.body;

    let conn;

    try{
        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.updateUsuarios, [nombre, status, email]); 
        res.json({usuarios})
    }catch(error){
        console.log(error);
        res
            .status(500)
            .json({msg:"Por favor contacte al administrador. ", error});
    }finally{
        if (conn) conn.end();
    }

};

const usuariosDelete = async (req = request, res = response) => {
    const {usuario, password} = req.query;

    let conn;

    try{
        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.deleteUsuarios, [email]); 
        res.json({usuarios})
    }catch(error){
        console.log(error);
        res
            .status(500)
            .json({msg:"Por favor contacte al administrador. ", error});
    }finally{
        if (conn) conn.end();
    }
   
};

const usuarioSignin = (req = request, res = response) => {
    const { email, password } = req.body;

    let conn;

    try{
        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.getUsuarioByEmail, [email]); 

        if (usuarios.length == 0){
            res.status(400).json({msg: `No se encontró el usuario ${email}.`});
            return;
        }

        const passwordValido = bcrypt.compareSync(password, usuarios[0].password);

        if (!passwordValido){
            res.status(401).json({msg: "La contraseña no coincide."});
            return;
        }

        res.json({msg: "inicio de sesión satisfactorio."});
    }catch (error){
        console.log(error);
        res
            .status(500)
            .json({msg:"Por favor contacte al administrador. ", error});

    }finally{
        if (conn) conn.end();

    }
}

module.exports = { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuarioSignin 
};
