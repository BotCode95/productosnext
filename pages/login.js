import React, {useState} from 'react'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import {Formulario, Campo, InputSubmit, TituloForm, Error} from '../components/ui/Formulario'
import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'
import firebase from '../firebase'

const STATE_INITIAL = {
  email: '',
  password: ''
}
export default function Login() {
  const [errores, setErrores] = useState(false);
  
  const {values, error,handleChange, handleSubmit} = useValidacion(STATE_INITIAL, validarIniciarSesion, iniciarSesion)

  const {email, password} = values;

  async function iniciarSesion() {
    try {
      const usuario = await firebase.login(email, password);
      console.log(usuario);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al iniciar la sesión', error.message);
      setErrores(error.message)
    }
  }
  return (
    <div>
       <Layout>
        <>
          <TituloForm>Iniciar Sesión</TituloForm>
          <Formulario 
            onSubmit={handleSubmit}
          >
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
              value="Iniciar Sesión"/>  
          </Formulario>
        </>
      </Layout>
    </div>
  )
}
