import React, {useState, useEffect, useContext} from 'react'
import {FirebaseContext} from '../firebase'


const useProductos = orden => {
    const [products, setProducts] = useState([]);
    const {firebase} = useContext(FirebaseContext);
  
    useEffect(() => {
      const getProductos = () => {
        //Snapshot es la forma en la que se accede a los registros
        firebase.db.collection('productos').orderBy(orden, 'desc')
        .onSnapshot(manejarSnapshot)
      }
      getProductos();
    }, [])
  
    function manejarSnapshot(snapshot) {
      const productos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setProducts(productos)
      // console.log(productos)
    }

    return {
        products
    }
}

export default useProductos
