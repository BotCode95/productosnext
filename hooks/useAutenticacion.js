import React, {useState, useEffect} from 'react'
import firebase from '../firebase'

const useAutenticacion = () => {
    const [usuarioAutenticado, setUsuarioAutenticado ] = useState(null);

    useEffect(() => {
        const  unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if(user) {
                setUsuarioAutenticado(user)
            }else {
                setUsuarioAutenticado(null) //su valor por default
            }
        });
        return () => unsubscribe();
    }, [])

    return usuarioAutenticado
}

export default useAutenticacion;
