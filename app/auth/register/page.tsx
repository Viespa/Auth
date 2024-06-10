import RegisterForm from "@/components/auth/register-form";
import exp from "constants"

const RegiserPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="hidden md:flex flex-col items-center justify-center bg-black text-white">
        <img src="/geometry.webp" alt="Geometry" className="w-full h-[100vh] object-cover" />
        <div className="absolute bottom-8 left-8">
     
        </div>
      </div>
      <RegisterForm />
    </div>
    )

}

export default RegiserPage;