import React, {useState} from 'react'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import {Formulario, Campo, InputSubmit, TituloForm, Error} from '../components/ui/Formulario'
import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'
import firebase from '../firebase'

const STATE_INITIAL = {
  nombre: '',
  empresa: '',
  //imagen: '',
  url: '',
  descripcion: '',
}

export default function NuevoProducto() {
  const [errores, setErrores] = useState(false);
  
  const {values, error,handleChange, handleSubmit} = useValidacion(STATE_INITIAL, validarCrearProducto, crearProducto)

  const {nombre, empresa, imagen, url, descripcion} = values;

  async function crearProducto()  {
    console.log('Crear producto')
  }
  return (
    <div>
    <Layout>
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
                  placeholder="Tu nombre" 
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
          {/* <Campo>
            <label htmlFor="imagen">Imagen</label>
            <input type="file" 
                  id="imagen"
                  name="imagen"
                  value={imagen}
                  onChange={handleChange}
            />
          </Campo>
          {error.imagen && <Error>{error.imagen}</Error>} */}
          <Campo>
            <label htmlFor="url">Url</label>
            <input type="url" 
                  id="url" 
                  placeholder="URL de tu producto" 
                  name="url"
                  value={url}
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
            {error.descripcion && <Error>{error.descripcion}</Error>}
          </fieldset>
          {errores && <Error>{errores}</Error>}
          <InputSubmit 
            type="submit" 
            value="Crear Producto"/>  
        </Formulario>
      </>
    </Layout>
  </div>
  )
}
