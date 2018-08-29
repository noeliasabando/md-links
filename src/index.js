#!/usr/bin/env node

//index.js: Desde este archivo debes exportar una función (mdLinks).
const Path = require("path")
const Marked = require("marked");
const fs = require("fs");
const fetch = require("node-fetch");

exports.mdLinks = function (path, options={}) {
  const promise = new Promise(function (resolve, reject) {

    fs.readFile(path, "utf8", function read(err, data) {
      if (err) {
        reject("Hubo un error al leer el archivo");//poner rreturn antes de reject????
        throw err
      }

      var links = markdownLinkExtractor(data);
      var linksOk = [];
      var separador= "\n";

      var lineas= data.split(separador); 

      links.forEach((link) => {
        let linea= 0;
        lineas.forEach((lineaActual, index)=>{
          let linkEncontrado=lineaActual.indexOf(`[${link.text}](${link.href})`)
          if(linkEncontrado >=0){
            linea= index+1;
          }
        });     

        if (options.hasOwnProperty("validate") && options.validate === true) {
          fetch(link.href).then((response) => {
            let ok;
            if(response.ok===true){
              ok= "ok";
            }else{
              ok="fail"
            }

            linksOk.push({
              href: link.href,
              text: link.text,
              file: Path.resolve(path),
              line: linea,
              status: response.status,
              ok: ok,
            })
            if (linksOk.length === links.length) {
              resolve(linksOk);
            }
          }).catch((error) => {
            linksOk.push({
              href: link.href,
              text: link.text,
              file: Path.resolve(path),
              line: linea,
              status: "fail",
              ok: "fail",
            })
            if (linksOk.length === links.length) {
              resolve(linksOk);
            }
          });
        } else {
          linksOk.push({
            href: link.href,
            text: link.text,
            file: Path.resolve(path),
            line: linea,
          })
          if (linksOk.length === links.length) {
            resolve(linksOk);
          }
        }
      })
    });
  });
  return promise;
};


// Función necesaria para extraer los links usando marked
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  renderer.link = function (href, text) {
    links.push({
      href: href,
      text: text,
    });
  };

  Marked(markdown, { renderer: renderer });

  return links;
}