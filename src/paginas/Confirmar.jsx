
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';


export const Confirmar = () => {

    const { token } = useParams();
    const [mensaje, setMensaje] = useState({})
    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            const respuesta = await axios.get(url)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])


    return (

        <div className="h-screen flex justify-center items-center">
            <div className="bg-[#ffe4e1] shadow-lg rounded-lg p-8 w-96">
                {/* Estilo del recuadro */}
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <div className="flex flex-col items-center justify-center">
                    <p className="text-3xl md:text-4xl lg:text-4xl text-gray-800 mt-12">Muchas Gracias</p>
                    <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Ya puedes iniciar sesión</p>
                    <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </div>

    )
}