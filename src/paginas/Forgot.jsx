import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

export const Forgot = () => {
    const [mensaje, setMensaje] = useState({})
	const [mail, setMail] = useState({})
    
    const handleChange = (e)=>{
        setMail({
            ...mail,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`
            const respuesta = await axios.post(url,mail)
            setMensaje({respuesta:respuesta.data.msg,tipo:true})
            setMail("")
        } catch (error) { 
            setMensaje({respuesta:error.response.data.msg,tipo:false})
        }
    }
    return (
        <>
             <div className="h-screen flex justify-center items-center">

             <div className="bg-[#ffe4e1] shadow-lg rounded-lg p-8 w-96"> {/* Estilo del recuadro */}
             {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Olvidaste tu contraseña!</h1>
                    <small className="text-gray-400 block my-4 text-sm">Por favor! Ingresa la siguiente informacion</small>


                    <form onSubmit={handleSubmit}>

                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">e-mail</label>
                            <input type="email" placeholder="Ingresa tu correo" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                            name='email' 
		                    onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">enviar e-mail
                            </button>
                        </div>

                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>Ya la recordaste!</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesion</Link>

                    </div>

                </div>

            </div>

            
        </>
    )
}