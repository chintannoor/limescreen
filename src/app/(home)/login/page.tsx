import Footer from '@/components/common/Footer/page';
import Header from '@/components/common/Header/page';
import React from 'react'
import LoginForm from './_components/login';

const LoginPage = () => {
  return (
    <>
        <Header/>
        <LoginForm/>
        <Footer/>
    </>
  )
}

export default LoginPage;