const express = require("express");
const { faker } = require('@faker-js/faker');
const app = express();

class Usuario {
    constructor() {
        this._id = faker.datatype.number();
        this.primerNombre = faker.name.firstName();
        this.apellido = faker.name.lastName();
        this.numeroTelefono = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}
const nuevoUsuario = new Usuario();

class Direccion{
    constructor(){
        this.calle = faker.address.streetAddress();
        this.ciudad = faker.address.city();
        this.estado = faker.address.state();
        this.codigoPostal = faker.address.zipCode();
        this.pais = faker.address.country();
    }
}
const nuevaDireccion = new Direccion();

class Empresa {
    constructor() {
        this._id = faker.datatype.number();
        this.nombre= faker.company.companyName();
        this.direccion = nuevaDireccion;
    }
}
const nuevaCompania = new Empresa();

app.get("/api/:users/:new", (request,response) => {
    
    if(request.params.users === "users" && request.params.new === "new"){
        return response.status(200).json(nuevoUsuario);
    }
    if(request.params.users === "companies" && request.params.new === "new"){
        response.send(`Company name: ${nuevaCompania.nombre}`);
    }
    if(request.params.users === "users" && request.params.new === "companies"){
        response.send(`User First Name: ${nuevoUsuario.primerNombre}; Company name: ${nuevaCompania.nombre}`);
    }

});

app.listen( 8080, () =>{
    console.log("El servidor se encuentra corriendo en el puerto 8080");
} );