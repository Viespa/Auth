import { NewVerificationForm } from '@/components/auth/new-verification-form';
import {AuthLayout} from "@/components/auth/auth-layout";
const NewVerificationPage = () => {
  return (
    <AuthLayout
    image_dark="/white-bg.webp">
    <NewVerificationForm />
  </AuthLayout>
  );
}

export default NewVerificationPage;