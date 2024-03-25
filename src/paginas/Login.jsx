import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import AuthContext from '../Context/AuthProvider'

const Login = () => {

    const navigate = useNavigate()
    //revisar 
    //const { setAuth, setEstado } = useContext(AuthContext) 
    const [mensaje, setMensaje] = useState({})

    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`
            const respuesta = await axios.post(url, form)
            localStorage.setItem('token', respuesta.data.token)
            setAuth(respuesta.data)
            navigate('/dashboard')
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setform({})
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-[#d6cfc1] shadow-lg rounded-lg p-8 w-96"> {/* Estilo del recuadro */}
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-black-500">Bienvenido a mi Sistema</h1>
                <small className="text-black-400 block my-4 text-sm">¡Ingresa tus datos!</small>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">E-mail</label>
                        <input type="email" placeholder="Ingresa tu e-mail"
                            name='email'
                            value={form.email || ""} onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                    </div>

                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                        <input type="password" placeholder="********************"
                            name='password'
                            value={form.password || ""} onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                    </div>

                    <div className="my-4">
                    <button className="py-2 w-full block text-center bg-[#9A3B3B] text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesion</button>

                    </div>
                </form>

                <div className="mt-5 text-xs border-b-2 py-4">
                    <Link to="/forgot/id" className="underline text-sm text-black-400 hover:text-gray-900">¿Olvidaste tu contraseña?</Link>
                </div>

                <div className="mt-3 text-sm flex justify-between items-center">
                    <p>No tienes una cuenta?</p>
                    <Link to="/register" className="py-2 px-5 bg-[#9A3B3B] text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrar</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;