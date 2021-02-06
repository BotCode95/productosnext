/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// import App from 'next/app'
import firebase, {FirebaseContext} from '../firebase'
import useAutenticacion from '../hooks/useAutenticacion'
import '../styles/globals.css'

const MyApp = props => {
  const usuario = useAutenticacion();
  // console.log(usuario);
  const {Component, pageProps} = props;
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}>
        <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
