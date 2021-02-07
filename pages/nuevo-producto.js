import React, {useState, useContext} from 'react'
import Router, {useRouter} from 'next/router'
import FileUploader from "react-firebase-file-uploader";
import Layout from '../components/layout/Layout'
import {Formulario, Campo, InputSubmit, TituloForm, Error} from '../components/ui/Formulario'
import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'
import {FirebaseContext} from '../firebase'
import Error404 from '../components/layout/404'

const STATE_INITIAL = {
  nombre: '',
  empresa: '',
  url: '',
  descripcion: '',
}

export default function NuevoProducto() {

  //state de las imagenes
  const [nameImagen, setName] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlimagen, setUrlImagen] = useState('');
  const [image, setImage] = useState(null);

  const [errores, setErrores] = useState(false);
  
  const {values, error,handleChange, handleSubmit} = useValidacion(STATE_INITIAL, validarCrearProducto, crearProducto)

  const {nombre, empresa, url, descripcion} = values;

  //hook de routing para redireccionar
  const router = useRouter();

  const {usuario, firebase} = useContext(FirebaseContext);

  // console.log(usuario);

  const handleFile = e => {
    if(e.target.files[0]){
     console.log(e.target.files[0])
     setImage(e.target.files[0])
    }
  }
  async function crearProducto()  {
    // console.log('Crear producto')
    if(!usuario) {
      return router.push('/login')
    }

    //obj new producto
    const producto = {
      nombre, 
      empresa,
      url,
      urlimagen, // : await handleUploadSuccess() 
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado : []
    }

    //insert db
    firebase.db.collection('productos').add(producto);

    return router.push('/');
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  }

  const handleProgress = progreso => {
    setProgreso({progreso})
  }
  const handleUploadError = error => {
    setSubiendo(error);
    console.error(error);
  }
  const handleUploadSuccess = nombre => {
    setProgreso(100);
    setSubiendo(false);
    setName(nombre);
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        //console.log(url);
        setUrlImagen(url)
      });   
  }

  
  return (
    <div>
    <Layout>
      {!usuario ? <Error404/> :
      <>
        <TituloForm>Nuevo Producto</TituloForm>
        <Formulario 
          onSubmit={handleSubmit}
        >
        <fieldset>
          <legend>Información</legend>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" 
                  id="nombre" 
                  placeholder="Nombre del producto" 
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
            />
          </Campo>
          {error.nombre && <Error>{error.nombre}</Error>}
          <Campo>
            <label htmlFor="empresa">Empresa</label>
            <input type="text" 
                  id="empresa" 
                  placeholder="Tu empresa" 
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
            />
          </Campo>
          {error.empresa && <Error>{error.empresa}</Error>}
          <Campo>
            <label htmlFor="image">Imagen</label>
            <FileUploader
                  type="file" 
                  accept="image/*"
                  id="image"
                  name="image"
                  randomizeFilename
                  storageRef = {firebase.storage.ref("productos")}
                  onUploadStart= {handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress= {handleProgress}
                  onInput={(e) => handleFile(e)}
            />
          </Campo>
          <Campo>
            <label htmlFor="url">URL:</label>
              <input 
                  type="url" 
                  id="url"
                  name="url"
                  placeholder="url de tu producto"
                  value= {url}
                  onChange={handleChange}
                  />
          </Campo>
          {error.url && <Error>{error.url}</Error>}
          </fieldset>

          <fieldset>
            <legend>Sobre tu Producto</legend>
            <Campo>
              <label htmlFor="descripcion">Descripción</label>
              <textarea  
                    id="descripcion" 
                    placeholder="Tu descripcion" 
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
              />
            </Campo>
            {/* {error.descripcion && <Error>{error.descripcion}</Error>} */}
          </fieldset>
          {errores && <Error>{errores}</Error>}
          <InputSubmit 
            type="submit" 
            value="Crear Producto"/>  
        </Formulario>
      </>
    }
    </Layout>
  </div>
  )
}
