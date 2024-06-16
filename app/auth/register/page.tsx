import RegisterForm from "@/components/auth/register-form";
import {AuthLayout} from "@/components/auth/auth-layout";
const RegiserPage = () => {
    return (
    <AuthLayout
      image_dark="/white-bg.webp">
      <RegisterForm />
    </AuthLayout>
    )

}

export default RegiserPage;