const express = require('express')
const mysql = require('mysql2')
var app = express()
var bodyPraser = require('body-parser')

var con = mysql.createConnection({


        host:'localhost',
        user:'root',
        password:'n0m3l0',
        database:'prueba'




})

con.connect()

app.use(bodyPraser.json())

app.use(bodyPraser.urlencoded({

    extended:true

}))

app.use(express.static('public'))

app.post('/agregarUsuario',(req,res)=>{


    let nombre = req.body.nombre

    con.query('insert into usuario values("'+nombre+'")',(err,respuesta,fields)=>{


        if(err) return console.log('Error',err)

        return res.send("<center><h1> Nombre: '"+nombre+"' <h1></center>"+"<link href='bonito.css' rel='stylesheet'/>")
        
    })


})

app.get('/consultarUsuario',(req,res)=>{


    let nombre = req.body.nombre

    con.query('Select * FROM usuario ',(err,respuesta,fields)=>{

        var USERhtml='';
        var i = 0;
        console.log(respuesta)
        respuesta.forEach(user =>{

            i++
            USERhtml += `<tr><td>${i}</td><td>${user.nombre}</td><td>`


        })

        return res.send(`<center><table>
        
            <link href="bonito.css" rel="stylesheet"/>
            <th>Numero: </th><th>Nombre: </th>

            ${USERhtml}
  
            </table><center>`)
    })


})

app.post('/quitar',(req,res)=>{


    let nombre = req.body.nombre

    con.query('delete from usuario where nombre =("'+nombre+'")',(err,respuesta,fields)=>{



        if(err) return console.log('Error',err)

        return res.send("<center><h1> Nombre eliminado: '"+nombre+"'<h1></center>" + "<link href='bonito.css' rel='stylesheet'/>")
    })


})

app.post('/cambiar',(req,res)=>{


    let nombre = req.body.nombre
    let nuevo = req.body.nuevo

    con.query('update usuario set nombre = ("'+nuevo+'") where nombre = ("'+nombre+'")',(err,respuesta,fields)=>{



        if(err) return console.log('Error',err)

        return res.send('<center><h1> Nombre: "'+nombre+'" fue cambiado por "'+nuevo+'" <h1></center>'+"<link href='bonito.css' rel='stylesheet'/>")
    })


})



app.listen(3000,()=>{


    console.log("Logueamos puerto 3000")
})