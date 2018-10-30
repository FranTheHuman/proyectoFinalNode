/*  
|   VALIDACION:
|  --------------
|       
|
|   Expresiones regulares:
|   ----------------------
|   Las expresiones regulares son patrones utilizados para encontrar una determinada combinación 
|   de caracteres dentro de una cadena de texto. En JavaScript, las expresiones regulares también son objetos. 
|   Estos patrones se utilizan en los métodos exec y test de RegExp, así como los métodos match, replace, search y split de String.
|   
|   Una expresión regular puede crearse de cualquiera de las dos siguientes maneras:
|
|   *--> Utilizando una representación literal de la expresión regular, consistente en un patrón encerrado entre diagonales, 
|   como a continuación: 
|   ***************************************
|   ***        var re = /ab+c/;         ***
|   ***************************************        
|   La representación literal ofrece la compilación de la expresión regular cuando se carga el script donde se encuentra. 
|   Si la expresión regular permanece constante, utilizar esta forma puede mejorar en rendimiento.
|
|   *--> Llamando a la función constructora del objeto RegExp, como a continuación: 
|   ***************************************
|   ***   var re = new RegExp('ab+c');  ***
|   *************************************** 
| 
|----------------------------------------------------------------------------------------------------------------------------------
|                                                       USUARIOS
|----------------------------------------------------------------------------------------------------------------------------------
|
|-----------------
| Verificar Email 
|-----------------
*/
const VerificarEmail = (email) => { 
    // La siguiente expresion acepta caracteres latinos --> /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
    // Ejemplo germán@bla.com - yo@mi-compañía.com - estação@brasil.com.br
    var filter =  /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

    if (filter.test(email)) {  
        return true;
    } else {  
        return false;
    }
}
/*  
|-------------
| TESTS EMAIL
|-------------
|
|  VerificarEmail("germán@bla.com"); true
|  VerificarEmail("yo@mi-compañía.com"); true
|  VerificarEmail("fljhsfkjadf");  false
|  VerificarEmail("estação@brasil.com.br"); true
|  VerificarEmail("<script>estação@brasil.com.br</script>"); false
|  VerificarEmail("german@bla.com"); true
|  VerificarEmail("gifhdjah a iod vash u@bla.com"); false
|  VerificarEmail("gifhdjah.a.iod.vash.u@bla.com"); true
|  VerificarEmail("gifhdjah_a_iod_vash_u@bla.com"); true
|  VerificarEmail("gifhdjah....u@b_la.com"); false
| 
|------------------
| Verificar Nombre
|------------------
*/
const verificarNombre = (nombre) => {
    var filter = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
    if (!filter.test(nombre) || nombre.replace(/\s+/gi,' ').trim().length > 35 || nombre.replace(/\s+/gi,' ').trim().length < 6 || nombre.replace(/\s+/gi,' ').trim().length == 0 || nombre == null) { 
        return false;
    } else { 
        return true;
    }
} 
/*  
|--------------
| TESTS NOMBRE
|--------------
|  
|  verificarNombre("14511654");
|  verificarNombre("");
|  verificarNombre(" ");
|  verificarNombre("  ");
|  verificarNombre("                   ");
|  verificarNombre("@laute");
|  verificarNombre("UwU");
|  verificarNombre("<script>");
|  verificarNombre("Lautaro Victor Francisco Perrotta");
|  verificarNombre("<script>Lautaro</script>");
|  verificarNombre("a           s                a");
|   
|----------------------
| Verificar Contraseña
|----------------------
|
|  1. Un dígito ubicado en cualquier sitio.
|  2. Una letra en minúscula ubicada en cualquier sitio.
|  3. Una letra en mayuscula ubicada en cualquier sitio.
|  expresion para las anteriores reglas --> /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/; 
|  4. Debe contener mas de 6 caracteres.
|
*/
const verificarContraseña = (password) => {
    var filter = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;  
    if(password == "1234"){ // de momento para no tener que crear otro admin
        return true;
    }
    if (!filter.test(password) || password.replace(/\s+/gi,' ').trim().length > 35 || password.replace(/\s+/gi,' ').trim().length < 6 || password.replace(/\s+/gi,' ').trim().length == 0 || password == null) { 
        return false;
    } else { 
        return true;
    }
}
/*  
|---------------
| TESTS PASSWORD
|---------------
|  
| verificarContraseña("123456");
| verificarContraseña("<script>asdas1452</script>");
| verificarContraseña("UwU");
| verificarContraseña("Habia1Vez");
| verificarContraseña("HabiaunaVez");
| verificarContraseña("   ");
| verificarContraseña(" Q@W ");
| verificarContraseña("@ @");
| verificarContraseña("H abia 1Ve z");
| verificarContraseña("H_abia_1Ve_z");
| verificarContraseña("Habia=1Ve=z");
| verificarContraseña("H_abia_1Vesadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss_z");
| verificarContraseña("H_abia_1Vesadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss_z<script>");
| verificarContraseña("Onepiece_1998");
| verificarContraseña("!Onepiece_1998!");
| verificarContraseña("|Onepiece_1998|");
| verificarContraseña("Onepiece\_1998");
*/
/*  
|----------------------------------------------------------------------------------------------------------------------------------
|                                                       LIBROS
|----------------------------------------------------------------------------------------------------------------------------------
|
|-----------------
| Verificar Titulo
|-----------------
|
*/
const verificarTitulo = (titulo) => {
    var filter = /^[A-Za-z0-9\s]+$/g;
    if (!filter.test(titulo) || titulo.replace(/\s+/gi,' ').trim().length > 50 || titulo.replace(/\s+/gi,' ').trim().length == 0 || titulo == null) { 
        return false;
    } else { 
        return true;
    }
}
/*
|---------------
| TESTS TITULO
|---------------
|
| verificarTitulo("Mi lucha");
| verificarTitulo("  Mi lucha  ");
| verificarTitulo(" dsad Mi lucha dasdfds !!! ");
| verificarTitulo("Mi lucha@@@######@#@#@#@#@#@#");
| verificarTitulo("Mi luchaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
| verificarTitulo("<script>Mi lucha</script>");
| verificarTitulo("lucha 4574 h");
|
|-----------------
| Verificar Genero
|-----------------
*/
const verificarGenero = (genero) => {
    var filter = /^[A-Za-z\s]+$/g;
    if (!filter.test(genero) || genero.replace(/\s+/gi,' ').trim().length > 30 || genero.replace(/\s+/gi,' ').trim().length < 4 || genero.replace(/\s+/gi,' ').trim().length == 0 || genero == null) { 
        return false;
    } else { 
        return true;
    }
}
/*
|---------------
| TESTS GENERO
|---------------
|
| verificarGenero("Terror");
| verificarGenero("Novela Historica");
| verificarGenero("Uwuaiosudpoia");
| verificarGenero("UwU");
| verificarGenero("Suspenso");
| verificarGenero("NOvela Dramatica");
| verificarGenero("<script>asdalks</script>");
| verificarGenero("    <script>asdalks</script>        ");
| verificarGenero("    Suspenso       ");
| verificarGenero("    Suspenso   dfgg  ");
|
|-----------------
| Verificar ISBN
|-----------------
*/
const verificarIsbn = (isbn) => {
	        
    //filter = /[^0-9X]/gi;
    if (isNaN(isbn) || isbn.replace(/\s+/gi,' ').trim().length !=13 || isbn == null) { 
        return false;
    } else { 
        return true;
    } 
}
/*
|---------------
| TESTS ISBN
|---------------
|
| verificarIsbn("8497364678");
| verificarIsbn(" 8497364678222 ");
| verificarIsbn(" 84973 64678222 ");
| verificarIsbn("84973 64678222");
| verificarIsbn("8497364678sdasd");
| verificarIsbn("8497364678222");
| verificarIsbn("8429-73264-2678");
| verificarIsbn("849-7364-678");
| verificarIsbn("84973_64678");
| verificarIsbn("999999999999999");
| verificarIsbn("8888888888888");
| verificarIsbn(" 22222222222 ");
| verificarIsbn(" 22222 22222 ");
|
|-----------------
| Verificar autor
|-----------------
|
*/
const verificarAutor = (autor) => {
    var filter = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/; 
    if (!filter.test(autor) || autor.replace(/\s+/gi,' ').trim().length > 35 || autor.replace(/\s+/gi,' ').trim().length < 5 || autor.replace(/\s+/gi,' ').trim().length == 0 || autor == null) { 
        return false;
    } else { 
        return true;
    }
} 
/*
|---------------
| TESTS AURTOR
|---------------
|
| verificarAutor("14511654");
| verificarAutor("");
| verificarAutor(" ");
| verificarAutor("  ");
| verificarAutor("                   ");
| verificarAutor("@laute");
| verificarAutor("UwU");
| verificarAutor("<script>");
| verificarAutor("Lautaro Victor Francisco Perrotta");
| verificarAutor("<script>Lautaro</script>");
| verificarAutor("a           s                a"); 
| verificarAutor("Borges"); 
|
|
|----------------------------------------------------------------------------------------------------------------------------------
|                                                       COMENTARIOS
|----------------------------------------------------------------------------------------------------------------------------------
|
|-----------------
| Verificar Texto
|-----------------
|
*/
const verificarTexto = (texto) => {
    var filter = /^[A-ZñÑáéíóúÁÉÍÓÚa-z0-9.,:;>!\s]+$/g;  
    if (!filter.test(texto) || texto.replace(/\s+/gi,' ').trim().length > 180 || texto.replace(/\s+/gi,' ').trim().length == 0 || texto == null) { 
        console.log(texto+": "+false);
        return false;
    } else { 
        console.log(texto+": "+true);
        return true;
    }
}
/*
|---------------
| TESTS Texto
|---------------
|
| verificarTexto("ueno, sad.;,:");
| verificarTexto("");
| verificarTexto(" ");
| verificarTexto(" s s ");
| verificarTexto("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
| verificarTexto(" sdasd564186156189945 ");
| verificarTexto("8741517151");
| verificarTexto("<script>8fbfdbfdbbb bccccccv dfgggggggdfg gdf7151</script>");
| 
*/

// Para poner en mayuscula la primera letra y las demas en minuscula
function MaysPrimera(string){  
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


export default {
    VerificarEmail,
    verificarNombre, 
    verificarContraseña,
    verificarTitulo,
    verificarGenero,
    verificarIsbn,
    verificarAutor,
    verificarTexto,
    MaysPrimera
}