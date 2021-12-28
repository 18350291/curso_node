const { request, response } = require("express");
const usuariosQueries = require("../models/usuarios");

const usuariosGet = async (req = request, res = response) => {
    let conn;

    try{
        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries
            .selectUsuarios) 
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
    //res.status(201).json({ msg: "Hola a todos desde POST", edad });
    let conn;

    try{
        conn = await Pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.insertUsuario,[nombre, email,password, status]); 
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

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete };
