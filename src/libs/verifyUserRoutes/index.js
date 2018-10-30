'use strcit'

// Vamos a verificar que el usuario descodificado en los tokens de cada llamada a las rutas exista
export const verifyUser = async (app, id) => {
    // Declaramos una variable que sera el modelo usuarios
    const Usuarios = app.db.db.models.Usuarios;
    // Buscamos el email que llega por la decodificacion del token
    const resultado = await Usuarios.findOne({where: { email: id }}); 
    // Dependiendo de q el resultado exista  devolvemos true o false
    if(resultado.email){ 
        return true;
    } else {
        return false;
    }
  
}