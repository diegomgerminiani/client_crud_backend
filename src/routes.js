/**
 * @file Endpoints da API
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */
const express = require("express");
const routes = express.Router();
const ClientsController = require("./controllers/ClientsController");


//Rotas para ClientsController
routes.post("/clients", ClientsController.createClient);
routes.get("/clients/:id", ClientsController.getClient);
routes.get("/clients", ClientsController.getClients);
routes.put("/clients", ClientsController.updateClient);
routes.delete("/clients/:id", ClientsController.deleteClient);

module.exports = routes;
