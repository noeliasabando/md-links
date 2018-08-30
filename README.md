# Librería Markdown Links

Esta **librería** (o biblioteca - _library_) fue creada con el lenguaje de 
programación JavaScript y Node, con el objetivo de que lea y analice archivos en 
formato Markdown, para verificar los links que contengan y algunas propiedades
de este, como href (URL encontrada), text (Texto que aparece dentro del 
link(`<a>`)), file (Ruta absoluta del archivo donde se encontró el link), 
line (línea donde aparece del status), estos dos últimos ligados a la opción 
**validate**.
Estos datos son obtenidos al pasarle la ruta del archivo a analizar, ya sea 
absoluta o relativa al directorio desde donde la estoy invocando.

## Instrucciones de instalación

Para instalar y poder utilizar la librería debes hacerlo en la terminal utilizando
`npm install https://github.com/noeliasabando/md-links`, esto permitirá que puedas 
utilizarla en el proyecto en el cual estás trabajando de forma programática, 
como se explica más abajo.
Si quieres que esta librería esté disponible para todos tu proyectos o deseas 
ocupar el **CLI**, entonces debes instalarla globalmente con
`npm install -g https://github.com/noeliasabando/md-links`.

## Uso

Ya instalada nuestra librería, podemos comenzar a usarla de dos formas, la primera
como módulo ejecutable (**CLI**) con el comando `md-links`.
Puedes utilizar `md-links` más la ruta del archivo que quieras analizar (ya sea 
absoluta o relativa al directorio desde donde la estas invocando) más `--validate`,
este último opcional, requerido solamente si quieres obtener además la respuesta status
y ok de tus links.
La segunda opción de uso es como una interfaz en la que podemos importar nuestra función
`mdLinks` con `require` en un archivo **js** para poder usarlo programáticamente, este debe 
ser llamado en la terminal mediante `node` más el nombre del archivo **js** que creaste
para importar la función.
A continuación se mostrarán ejemplos de uso para ambos casos.

## Ejemplos de uso

### Utilización como comando (CLI)

Puedes utilizar `md-links` como comando directamente en la terminal.
En terminal, md-links más la ruta de tu archivo (absoluta o relativa) y la opción 
`--validate`.

`node <myPath> [--validate]` ó `node <myPath>`

#### Ejemplo con ruta relativa
```sh
$ md-links ./some/example.md --validate
```

```sh
$ md-links ./some/example.md
```

#### Ejemplo con ruta absoluta
```sh
$ md-links C:/Users/Some/Documents/proyectos some/pinterest/readme.md --validate
```

```sh
$ md-links C:/Users/Some/Documents/proyectos some/pinterest/readme.md
```

### Utilización programática

Esta librería puede importarse en otros scripts de Node.js y ofrece la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo. 

- `options`: Un objeto con la siguiente propiedad:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. (tipo de dato booleano)

Esta librería contiene dos archivos **js**, uno es **index.js** el cual se encuentra en carpeta
`src`, este archivo contiene función `mdLinks`, la cual debes importar en tu archivo **js**, 
creado en la raíz del proyecto, como se muestra a continuación.

En tu archivo **js**
```js
mdLinks = require("md-links")

//myPath hace referencia a la ruta de tu archivo, ya sea absoluta o relativa
//Vale recordar que validate es opcional, si la requieres es true, sino false

mdLinks.mdLinks("myPath", {validate:true}).then((links)=>{
console.log(links)
});
```
En terminal, node más nombre de tu archivo **js**, por ejemplo node app.js.

`node <myPath>`

 