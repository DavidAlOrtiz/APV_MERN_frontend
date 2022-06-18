import AdminNav from "../componets/AdminNav"
import useAuht  from "../hooks/useAuht"
import Alerta from '../componets/Alerta'
import { useEffect, useState } from "react";
const EditarPerfil = () => {

  const {auth, actualizarPerfil} = useAuht();
  const [perfil, setPerfil] = useState({}); 
  const [alerta, setAlerta] = useState({});

  useEffect( () => {
    setPerfil(auth.veterinario);
  }, [auth] );
  console.log(perfil)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {nombre, email} = perfil;
    if([nombre, email].includes('')){
      setAlerta({
        msg: 'El email y el nombre son obligatorios',
        error: true
      }) 
      return;
    }
    const resultado = await actualizarPerfil(perfil)
    setAlerta({resultado})
  }
  const {msg}  = Alerta
  return (
    <>
        <AdminNav></AdminNav>
        <h2 className="font-black text-center mt-10 text-3xl">Edita tu perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""} 
            <span className="text-indigo-600 font-bold" >Informacion aqui</span></p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            {msg && <Alerta alerta={alerta}></Alerta>}
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Nombre</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="nombre"
                  value={perfil.nombre || '' }
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })}
                ></input>
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Sitio web</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="web"
                  value={perfil.web || ''}
                  onChange={ e => setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                  })
                }
                ></input>
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Telefono</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="telefono"
                  value={perfil.telefono || ''}
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                  })}
                ></input>
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">email</label>
                <input type="text" 
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="email"
                  value={perfil.email || ''}
                  onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                  })}
                ></input>
              </div>
              <input
                 type="submit"
                 value="Guardar Cambios"
                  className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
              >
              
              </input>
            </form>
          </div>
        </div>
        
    </>
  )
}

export default EditarPerfil