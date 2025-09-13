// app/register/page.tsx

import Header from "@/components/common/Header/page";
import Footer from "@/components/common/Footer/page";
import RegisterForm from "./_components/registration";

export default function RegisterPage() {
  return (
    <>
      <Header/>
      <RegisterForm />
      <Footer/>
    </>
  );
}
