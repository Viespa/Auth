import LoginForm from "@/components/auth/login-form";
import {AuthLayout} from "@/components/auth/auth-layout";

const LoginPage = () => {
    return (
    
    <AuthLayout
      image_dark="/white-bg.webp"
    >
      <LoginForm />
    </AuthLayout>
    
    )

}

export default LoginPage;