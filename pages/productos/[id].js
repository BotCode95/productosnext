import React, {useEffect, useContext, useState} from 'react'
import {useRouter} from 'next/router'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale'
import {FirebaseContext} from '../../firebase'
import Layout from '../../components/layout/Layout'
import Error404 from '../../components/layout/404'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Campo, InputSubmit} from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid; 
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: var(--naranja);
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
`;

const Producto = () => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true)

    const router = useRouter();
    // console.log(router);
    const {query: {id}} = router;

    const {usuario, firebase} = useContext(FirebaseContext);
    useEffect(() => {
        if(id && consultarDB) {
            const getProduct  = async () => {
                const productoQuery =await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                // console.log(producto.data());
                if(producto.exists) {
                    setProduct(producto.data());
                    setConsultarDB(false);
                    // console.log('Producto existe');
                } else {
                    setError(true);
                    setConsultarDB(false)
                    // console.log('Producto no existe');
                }
            }
            getProduct();
        }
    }, [id])

    if(Object.keys(product).length === 0 && !error) return 'Cargando...' //<Error404/> 

    const {comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado} = product;
    // console.log(product);

    //votos
    const votarProducto = () => {
       if(!usuario) {
           return router.push('/login');
       }
       const nuevoTotal  = votos + 1;
       //verificar si el usuario actual tiene voto, si lo tiene no lo deja votar nuevamente
       if(haVotado.includes(usuario.uid)) return;

       const YaVoto = [...haVotado, usuario.uid];
       //update db
       firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado: YaVoto})

       setProduct({
           ...product,
           votos: nuevoTotal
       });

       setConsultarDB(true) 
    }

    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    const esCreador = id =>{
        if(creador.id == id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();
        if(!usuario) {
            return router.push('/login');
        }
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        const nuevosComentarios = [...comentarios, comentario];

        firebase.db.collection('productos').doc(id).update({ comentarios: nuevosComentarios})

        setProduct({
            ...product,
            comentarios: nuevosComentarios
        });

        setConsultarDB(true) 
    }

    const puedeBorrar = () => {
        if(!usuario) return false;
        if(creador.id === usuario.uid) {
            return true;
        }
    }

    const eliminarProducto = async () => {
        if(!usuario) return false;
        if(creador.id === usuario.uid) {
        return router.push('/login');
        }
        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        <Layout>
            {error ? <Error404/> : (
            <div className="contenedor">
                <h1
                    css={css `
                        text-align : center;
                        margin-top: 5rem;
                    `}
                >{nombre}</h1>
                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                        <p>Por: {creador.nombre} de {empresa}</p>
                        {/* <p>Posted {created ? formatDistanceToNow(new Date(created)) : null} ago</p> */}
                        <img src={urlimagen}/>
                        <p>{descripcion}</p>
                        {usuario && (
                            <>
                            <h2>Agrega tu comentario</h2>
                            <form
                                onSubmit={agregarComentario}
                            >
                                <Campo>
                                    <input
                                        type="text"
                                        name="mensaje"
                                        onChange={comentarioChange}
                                    />
                                </Campo>
                                <InputSubmit
                                    type="submit"
                                    value="Agregar Comentario"
                                />
                            </form>
                            </>
                        )}
                        <h2                            
                            css={css `
                                margin: 2rem 0;
                            `}
                        >Comentarios</h2>
                        {comentarios.length === 0 ? 'Aún no hay comentarios ' : (
                            <ul>
                            {comentarios.map((comentario, i) => (
                                <li
                                    key={`${comentario.usuarioId}-${i}`}
                                    css={css `
                                        border: 1px solid var(--gris2);
                                        padding: 2rem;
                                    `}
                                >
                                    <p>{comentario.mensaje}</p>
                                    <p>Escrito por: 
                                        <span css={css ` font-weight: bold`}>{''} {comentario.usuarioNombre}</span>
                                    </p>
                                    {esCreador(comentario.usuarioId) && <CreadorProducto>Autor</CreadorProducto>}
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>
                    <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Boton>
                            
                            <div 
                                css={css ` 
                                margin: 5rem
                            `}>
                            <p 
                                css={css ` 
                                text-align: center
                            `}
                            >{votos} Votos</p>
                            {usuario && (
                                <Boton
                                    onClick={votarProducto}
                                >Votar</Boton>
                            )}
                            </div>
                    </aside>
                </ContenedorProducto>
                {puedeBorrar() && <Boton
                    onClick={eliminarProducto}
                >Eliminar Producto</Boton>}
            </div>
            )}
        </Layout>
        </div>
        
    )
}

export default Producto
