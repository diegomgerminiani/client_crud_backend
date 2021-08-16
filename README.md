# CRUD Clientes Backend
 
 Backend de um CRUD simples de cliente, desenvolvido com ExpressJS, mas com possibilidade de deploy na AWS.
 
 Optei por construir uma aplicação hibrida, onde fosse possível aplicar as rotas como Lambda Functions na AWS (Deploy atual), mas que também rodasse como servidor.
 
 Os dados foram persistidos no banco de dados não-relacional NEO4J.
 
 ## Rodando o servidor
 ```npm run server```
  
 ## Rodando como serverless localmente
 ```npm run sls:test```
   
 ## Rodando como serverless online na AWS
 ```npm run sls:up```
    
 ## Removendo aplicação da AWS
 ```npm run sls:down```
 
