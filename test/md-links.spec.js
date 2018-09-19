const Path = require("path");
const lib = require("../src/index");
var esperado;
var root = Path.resolve("./");

test("mdLinks debe retornar promesa", ()=>{
  expect(lib.mdLinks("./test/testOk.md")).toBeInstanceOf(Promise);
});


test("Promesa retorna Array de Objetos", ()=>{
  return lib.mdLinks("./test/testOk.md")
    .then(links => {
      expect(links).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
});


test("Reconoce Links", () => {
  esperado = [
    {
      href: "https://www.google.com",
      text: "Google",
      file: Path.join(root,"test","testOk.md"),
      line: 1
    }
  ]
  return lib.mdLinks("./test/testOk.md")
    .then(links => {
      expect(links).toEqual(esperado);
    })
});


test("Valida Links Ok",()=>{
  esperado= [
    {
      href: "https://www.google.com",
      text: "Google",
      file: Path.join(root,"test","testOk.md"),
      line: 1,
      status:200,
      ok: "ok",
    }
  ]
  return lib.mdLinks("./test/testOk.md",{validate: true })
    .then(links=>{
      expect(links).toEqual(esperado);
    })
})

test("Obtener Link sin validar",()=>{
  esperado= [
    {
      href: "https://www.google.com",
      text: "Google",
      file: Path.join(root,"test","testOk.md"),
      line: 1,
    }
  ]
  return lib.mdLinks("./test/testOk.md",{validate: false })
    .then(links=>{
      expect(links).toEqual(esperado);
    })
})

test("Valida Links Fail",()=>{
  esperado= [
    {
      href: "https://httpstat.us/418",
      text: "Error",
      file: Path.join(root,"test","test418.md"),
      line: 1,
      status:418,
      ok: "fail",
    }
  ]
  return lib.mdLinks("./test/test418.md", {validate:true})
    .then(links=>{
      expect(links).toEqual(esperado);
    })
})

test("Obtener Link fail sin validar",()=>{
  esperado= [
    {
      href: "https://httpstat.us/418",
      text: "Error",
      file: Path.join(root,"test","test418.md"),
      line: 1,
    }
  ]
  return lib.mdLinks("./test/test418.md",{validate: false })
    .then(links=>{
      expect(links).toEqual(esperado);
    })
})

test("Validar Url inexistente",()=>{
  esperado= [
    {
      href: "http://www.bxkscjd.com/",
      text: "Url no existe",
      file: Path.join(root,"test","testUrlNoExiste.md"),
      line: 1,
      ok: "fail",
      status: "fail",
    }
  ]
  return lib.mdLinks("./test/testUrlNoExiste.md",{validate: true })
    .then(links=>{
      expect(links).toEqual(esperado);
    })
}, 7000)


