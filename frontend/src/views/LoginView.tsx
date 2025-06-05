import { Link } from "react-router-dom"

export default function LoginView() {
  return (
    <>
        <div className="text-4xl text-white font-black">Iniciar Sesión</div>
        <nav className="mt-10">
            <Link 
                className="text-center text-white text-lg block"
                to="/auth/register">¿No tienes cuenta? Crea un aqui</Link>
        </nav>
    </>
  )
}
