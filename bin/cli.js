#!/usr/bin/env node
mdLinks = require("../src/index")

const [, , ...args] = process.argv;

let options = {};
if (args[1] === "--validate") {
  options = { validate: true }

  mdLinks.mdLinks(args[0], options).then((links) => {
    links.forEach((link) => {
      console.log(link.file + " " + link.href + " " + link.ok + " " + link.status + " " + link.text)
    })
  }).catch((error) => {
    console.error("Error > " + error);
  });
} else {
  options = { validate: false }
  mdLinks.mdLinks(args[0], options).then((links) => {
    links.forEach((link) => {
      console.log(link.file + " " + link.href + " " + link.text)
    })
  }).catch((error) => {
    console.error("Error > " + error);
  });
}



