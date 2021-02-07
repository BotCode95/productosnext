export default function validarCrearProducto(values) {
    let errores = {};

    if(!values.nombre) {
        errores.nombre = "El nombre es obligatorio";
    }

    if(!values.empresa) {
        errores.empresa ="El nombre de la empresa es obligatorio"
    }
    
    if(!values.url) {
        errores.url = "La URL del producto es obligatoria"
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errores.url = "URL mal formateada o no válida"
    }
    return errores;
}
