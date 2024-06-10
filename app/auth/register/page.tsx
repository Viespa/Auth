import RegisterForm from "@/components/auth/register-form";
import exp from "constants"
import { DarkMode } from "@/components/ui/dark-mode";
const RegiserPage = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="hidden md:flex flex-col items-center justify-center  text-white">
        <img src="/white-bg.webp" alt="Geometry" className="w-full h-[100vh] object-cover" />
        <div className="absolute top-[0] left-[0]">
          <img src="/logo.png" alt="Company Logo" className="w-[10rem] h-[10rem]" />
        </div>
        <div className="absolute top-[1rem] right-[1rem]">
          <DarkMode />
        </div>
      </div>
      <RegisterForm />
    </div>
    )

}

export default RegiserPage;