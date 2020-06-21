# Qué es Webpack
Es un empaquetador de módulos, permite:
* Gestionar las dependencias
* Montar rápidamente servidores de desarrollo y pruebas.
* Cargar módulos.
* Convertir a diferentes formatos(pasar de ES8 a ES5 por ejemplo).
* Minimizar código.
* Compilar de SASS a CSS.
* Compilar de Typescript a Javascript.
* Permite trabajar con JS moderno.

# Instalación de Webpack

1. Comprobar que tenemos node instalado.Abrimos una terminal 
   y escribimos *node --version*.(Si no lo tienes descargatelo desde node).

2.  Crear el fichero *package.json* para ello hay que teclear *npm init*.
    Responder a las preguntas. 
    Este fichero informa a la aplicación y a node de:
     * Las dependencias necesarias.
     * Cómo funciona la aplicación.
     * Qué cosas no son necesarias en producción.
    Al terminar crea el fichero, de éste aspecto: 
    ![Alt](/package_json.png) 

3. Creamos la carpeta donde estará el proyecto, una vez hecho:
    * Crear una carpeta *src*. Webpack verificará esta carpeta por defecto. 
      Dentro de esa carpeta irá la estructura del proyecto(carpet *js*, carpeta *css*, *index.html*...Etc)
4. Desde la [Web](https://webpack.js.org/guides/getting-started/) de       
   Webpack seguimos el procedimiento de instalar webpack:
    ### Ojo: Hay que situarse en el directorio donde esta *package.json*!!!.

    Instalación manual:
    ```
    npm install webpack webpack-cli --save-dev
    ```
    ó 
   ```
    npm i -D webpack webpack-cli 
    ```

    *--save-dev* significa que la ponga como dependencia de desarrollo, ya que webpack no irá a producción.
5. Añadir en *package.json* el par *"build":"webpack"*.Eso significa que cuando haga un build en desarrollo disparará webpack automáticamente.
   ![Alt](/package_json_build.png)

   Para construirlo hay que ejecutar *npm run build*

# Carpeta *Dist*
 Esta carpeta la Webpack por nosotros al hacer un *build*.Se puede borrar tantas veces como queramos.
 En ella se crea el fichero *main.js*
 Éste es la aplicación tal cual.

# Configuración de webpack
Para automatizar la compilación y automatización de ficheros cada vez que hacemos cambios, necesitamos crear el fichero *webpack.config.js*( a la misma altura que *package.json*).

 ![Alt](/webpack_config_js.png)
 *mode:development* Indica que es desarrollo, permite escribir comentarios, cosa que no deja en producción.

### A tener en cuenta:
 * Instalar dos paquetes *html-loader* y * html-webpack-plugin*
 ```
 npm i -D html-loader html-webpack-plugin
 ```
 Estos dos paquetes permiten incrustar el fichero *index.html* en la carpeta *dist* y le dice a webpack que incruste el *main.js* en el *index.html*.
 En las reglas hay que añadir una, -*test*- en la que si es un fichero html usar el *html-loader* (ver imagen).

La opción *minimize:true* de la regla indica que no ponga comentarios en producción.

 crear la variable HtmlWebPackPlugin para cargar el plugin instalado antes.
 (ver imagen).
  

# Webpack Dev Server
Paquete que permite automáticamente cargar los cambios en el html, js que hagamos.

Instalación:

```
npm i -D webpack-dev-server
```
Seguidamente en package.json añadimos 
*"start":"webpack-dev-server --open"*.Esto le dice a webpack que apenas se levante webserver ábrelo.

![Alt](/package_json_start.png)

Se puede especificar el puerto añadiendo *--port=8081*.


# Webpack production mode
Una opción para traabajar en modo producción es en *webpack_confing.js*
En *mode* indicar *production*.
Lo mejor es crear un fichero aparte con configuración para producción.
*webpack.prod.js*

### Cómo indicar que trabajamos en produccón o desarrollo.
En *package.json* indicamos en *"build" : "webpack"*, ese es modo desaroollo.
Para indicar modo producción hay que modificar a *"build":"webpack --config webpack.prod.js"*

Se podría crear un modo de **preproducción** para tener los archivos por ejemplo, pero sin minimizar, para hacer pruebas; entonces podríamos añadir:
*"build:dev":"webpack --config webpack.config.js"* 

 Para asegurarnos que se cargan las actualizaciones en producción, webpack creó el contentHash, sólo hay que indicarlo para que éste cambie y por lo tanto actualize los archivos del cliente.
 Para ello en *webpack.prod.js* hay que escribir:
 ```
 output: {
    filename: 'main.[contentHash].js'
 }
 ```
 



# Webpack Starter

Este es el proyecto inicial para crear aplicaciones utilizando webpack.

### Notas:
Recuerden reconstruir los módulos de Node
```
npm install
```

Y para construir el build, recuerden:
```
npm run build
```