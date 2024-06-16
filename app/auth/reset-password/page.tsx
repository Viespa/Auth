import { NewPasswordForm }from '@/components/auth/new-password-form';
import {AuthLayout} from "@/components/auth/auth-layout";
const NewVerificationPage = () => {
  return (
    <AuthLayout
    image_dark="/white-bg.webp">
    <NewPasswordForm />
  </AuthLayout>
  );
}

export default NewVerificationPage;