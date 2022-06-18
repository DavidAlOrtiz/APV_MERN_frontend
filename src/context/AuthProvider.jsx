import {useState, useEffect, createContext} from 'react';
import clienteA from '../config/Clienteaxios'

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    useState(()=>{
        
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return ;
            }

            const configuracion = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const {data} = await clienteA('/veterinaria/perfil', configuracion)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)

        }
        autenticarUsuario();
    }, [])
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }
    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return ;
        }

        const configuracion = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinaria/perfil/${datos._id}`;
            const {data} = await clienteA.put(url, datos, configuracion);
            console.log(data)
            return { msg:"alamacenado correctamente"}
        } catch (error) {
            return{
                msg: error.message.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) =>{
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return ;
        }

        const configuracion = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = '/veterinaria/actualizarPassword';
            const {data} = await clienteA.put(url, datos, configuracion);
            return { msg : data.msg}
        } catch (error) {
            console.log(error);
            return {
                msg : error.response.data.msg,
                error : true
            }
        }
    }
    
    return (

        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children}

        </AuthContext.Provider>

    )
}

export {
    AuthProvider
};

export default AuthContext;