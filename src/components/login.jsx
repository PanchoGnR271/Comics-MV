import React, { useState } from 'react'
import Image from '../assets/SMIMG.jpg'
import ImgProfile from '../assets/profile.png'
import "./login.css"
import { useNavigate } from 'react-router-dom'

import appFirebase from '../credentials'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)

function Login() {

  const[register,setRegister] = useState(false)

  const navigate = useNavigate();

  const funcAuth = async(e) => {
    e.preventDefault();
    const mail = e.target.email.value;
    const PassWord = e.target.password.value;

    if (register){
      try {
        await createUserWithEmailAndPassword (auth,mail,PassWord);
        navigate("/")
      } catch (error) {
        alert("Asegurese de que la contraseña tenga más de 8 caractéres")
      }
    }

    else{
      try {
        await signInWithEmailAndPassword (auth,mail,PassWord);
        navigate("/")
      } catch (error) {
        alert("El correo o contraseña son incorrectos")
      }
    }

  }

  return (
    <div className='container'>
      <div className="row">

        {/* Image column */}
        <div className="col-md-4">
          <img src={Image} alt="" className='img-size' />
        </div>

        {/* Form column */}
        <div className="col-md-4">
          <div className="father">
            <div className="card card-body shadow">
              <img src={ImgProfile} alt="" className='profile-style'/>
              <form onSubmit={funcAuth}>
                <input type="text" placeholder='E-mail' className='text-box' id='email'/>
                <input type="password" placeholder='Contraseña' className='text-box' id='password' />
                <button className='login-btn'>{register ? "Registrarse" : "Ingresar"}</button>
              </form>
              <h4 className='text'>{register ? "Ya tienes cuenta" : "¿No tienes cuenta?"}<button className='btn-switch' onClick={()=>setRegister(!register)}>{register ? "Iniciar Sesion" : "Registrarse"}</button></h4>
            </div>
          </div>
        </div>

        
      </div>

    </div>
  )
}

export default Login
