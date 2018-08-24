#!/usr/bin/env node
mdLinks = require("./src/index")

/* console.log(mdLinks.mdLinks("C:/Users/Noelia/Documents/proyectos laboratoria/pinterest/readme.md", 1)) */
mdLinks.mdLinks("README.md", 1).then((links)=>{
  console.log(links)
});
