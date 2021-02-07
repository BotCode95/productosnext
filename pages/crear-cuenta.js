import React, {useState} from 'react'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import {Formulario, Campo, InputSubmit, TituloForm, Error} from '../components/ui/Formulario'
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'
import firebase from '../firebase'

const STATE_INITIAL = {
  nombre: '',
  email: '',
  password: ''
}
export default function CrearCuenta() {
  const [errores, setErrores] = useState(false);
  
  const {values, error,handleChange, handleSubmit} = useValidacion(STATE_INITIAL, validarCrearCuenta, crearCuenta)

  const {nombre, email, password} = values;

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      setErrores(error.message)
    }
  }
  return (
    <div>
      <Layout>
        <>
          <TituloForm>Crear Cuenta</TituloForm>
          <Formulario 
            onSubmit={handleSubmit}
          >
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
              <label htmlFor="email">Email</label>
              <input type="email" 
                    id="email" 
                    placeholder="Tu email" 
                    name="email"
                    value={email}
                    onChange={handleChange}
                    />
            </Campo>
            {error.email && <Error>{error.email}</Error>}
            <Campo>
              <label htmlFor="password">Contraseña</label>
              <input type="password" 
                    id="password" 
                    placeholder="Tu password" 
                    name="password"
                    value={password}
                    onChange={handleChange}
                    />
            </Campo>
            {error.password && <Error>{error.password}</Error>}
            {errores && <Error>{errores}</Error>}
            <InputSubmit 
              type="submit" 
              value="Crear Cuenta"/>  
          </Formulario>
        </>
      </Layout>
    </div>
  )
}
