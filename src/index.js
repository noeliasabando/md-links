#!/usr/bin/env node

//index.js: Desde este archivo debes exportar una función (mdLinks).
const Path = require("path")
const Marked = require("marked");
const fs = require("fs");

exports.mdLinks = function (path, options) {
  const promise = new Promise(function (resolve, reject) {    
    
    fs.readFile(path, "utf8", function read(err, data){
      if(err){
        reject("Hubo un error al leer archivo");
        throw err
      }
 
      var links= markdownLinkExtractor(data); 
      var linksOk= [];
      links.forEach((link)=>{
        linksOk.push({
          href: link.href,
          text:link.href,
          file:Path.resolve(path),
        })
      })   
      resolve(linksOk);
    });    
  });
  return promise;
};



// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      text: text,
      /* title: title, */
    });
  };
 /*  renderer.image = function (href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
    });
  }; */
  Marked(markdown, { renderer: renderer });

  return links;
}