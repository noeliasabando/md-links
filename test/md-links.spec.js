const lib = require("../src/index");
var esperado;

test("mdLinks debe retornar promesa", ()=>{
  expect(lib.mdLinks("./test.md")).toBeInstanceOf(Promise);
});


test("Promesa retorna Array de Objetos", ()=>{
  lib.mdLinks("./test.md")
    .then(links => {
      expect(links).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
    .catch(console.error);
});


test("Reconoce Links", () => {
  esperado = [
    {
      href: "www.google.com",
      text: "Google",
      file: "test.md"
    }
  ]

  lib.mdLinks("./test.md")
    .then(links => {
      expect(links).toEqual(esperado);
    })
    .catch(console.error);

});


test("Valida Links",()=>{
  esperado= [
    {
      href: "www.google.com",
      text: "Google",
      file: "test.md",
      status:"ok"
    }
  ]

  lib.mdLinks("./test.md", {validate: true })
    .then(links=>{
      expect(links).toEqual(esperado);
    })
    .catch(console.error);
})




