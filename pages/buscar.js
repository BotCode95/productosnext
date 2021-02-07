import React, {useEffect, useState} from 'react'
import Layout from '../components/layout/Layout'
import {useRouter} from 'next/router'
import DetallesProductos from '../components/layout/DetallesProductos'
import useProductos from '../hooks/useProductos'

export default function Buscar() {
  
  const router = useRouter();
  const { query : {q}} = router;
  // console.log(q);
  const {products} = useProductos('creado');
  const [resultado, setResultado] = useState([])

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = products.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    });
    setResultado(filtro)
  }, [q, products])

  return (
    <div>
       <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map(producto => (
                  <DetallesProductos
                    key={producto.id}
                    producto={producto}
                  />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
