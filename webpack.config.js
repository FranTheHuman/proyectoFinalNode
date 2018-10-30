'use strict'

const path = require('path');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
require("@babel/polyfill");

/*
|--------------------------------------------------------------------------
| WEBPACK
|--------------------------------------------------------------------------
|
| Module Bundler para aplicaciones modernas en js, es decir un empaquetador de módulos para el desarrollo 
| de aplicaciones modernas en JavaScript.
|
| ¿Por qué usar Webpack?
|
| Aunque hay otras alternativas, WP es un la forma mas sofisticada para cargar y transformar módulos. 
| WP trae todas las formas de importación de módulos, en resumen trae lo mejor de todos los mundos.
| 
| * Entrypoints 
|    - múltiples puntos de entrada a tus aplicaciones 
|    - archivos iniciales, tienes uno por cada pagina que vayas a usar.
|    - Puedes tener multiples entrypoints.
| 
| * Output.
|       Si bien le decimos cual es el archivo fuente, debemos decirle que hacer con eso y donde ponerlo, 
|       porque no queremos mezclar los archivos finales que lee el navegador con los archivos fuente.
|
| * Loaders. 
|     Nos ayudan a cargar todo tipo de formato de archivos.
|  
| * Plugins. 
|     Nos ayudan a extender las caracteristicas de WP, por ejemplo comprimir archivos, dividir nuestros modulos en chunks, etc.
|
|  Webpack es developer experience.
|
|
*/
 
// Exportamos una funcion que obtiene una variable que declaramos al momento de ejecutar el comando de webpack
module.exports = (env) => {
    // Declaramos dos variables que pueden variar dependiendo de, en este caso, el entorno de produccion o desarrollo
    const plugins = []; // array basio q posiblemente recibira plugins
    let devtool = 'eval-source-map'; // esta opcion es para obtener un mejor conociemiento sobre los errorres en el desarrollo con react
    // si la variable es de produccion 
    if (env.NODE_ENV === 'production') {
        // agregamos a los plugins uno para limpiar las carpetas output 
        plugins.push( new CleanWebpackPlugin(['src/public/js'], {root: __dirname}));
        // en produccion no queremos esta opcion.
        devtool = false;
    }
    // Retornamos la configuracion de webpack
    return {
    entry: {
        // Aqui le decimos a webpack cual es el el archivo/s de entrada (entry point)
        "proyfinal": ["@babel/polyfill", path.resolve(__dirname, 'src/client/index.js')],
    },
    output: { // Aqui especificamos los datos de el archivo de salida 
        path: path.resolve(__dirname, 'src/public/js'),
        filename: '[name].js'
    },
    devtool: devtool, // especificamos la opcion mencionada anteriormente 
    devServer: { 
    // en produccion, vamos a ejecutar a webpack en un servidor que escuche los cambios constantemente, ese servidor escuchara en el puerto 9000
      port: 9000,
    }, 
    module: { // aqui comienza la magia de webpack y especificamos que archivos va a manipular 
        rules: [
            {
                use: {
                    loader: 'babel-loader' //para transpilarlos utilizara babel-loader, el cual se encuentra configurado en el .babelrc
                },
                test: /\.(js|jsx)$/, // los archivos js y jsx(react)
                exclude: /(node_modules)/ //excluimos node modules q prodiamos usar  en los imports
            }
            // {
            //     test: /\.css$/, // los archivos css
            //      use: [
            //         {
            //          loader: "css-loader", //para transpilarlos utilizara css-loader
            //          options: {
            //              minimize: true,
            //              imports: true,
            //          }
            //         }
            //     ]
            // }
        ]
    },
    // agregamos el array de plugins vacio o con plugins 
    plugins 
}}

