"use client";
import React, { useState } from "react";
import "@/styles/css/registration.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "@/types/zodValidation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginAction } from "../_actions/loginServerActions";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: LoginFormInputs) => {
  const user = await loginAction(data);

  if (user.status === 400 || user.data.id === undefined) {
    alert("Login failed");
    return;
  }

  const result = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (user.status === 400 || result?.error) {
    console.error("SignIn failed", result?.error);
    alert("Login failed");
    return;
  }

  // alert("Login successful");
  const id = user.data.id;
  router.push(`/artist/edit/${id}`);
};


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="main-w3layouts wrapper register-sec">
        <h1>Login</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <input
                className="text"
                type="text"
                {...register("email")}
                placeholder="Enter email or mobile no"
                required
              />
              {/* <span style={{ color: "red" }}>{errors.email?.message}</span> */}
              <div className="input-block">
                <i
                  className={`fa ${
                    passwordVisible ? "fa-eye-slash" : "fa-eye"
                  } mt-3 togalcurrentpass`}
                  onClick={togglePasswordVisibility}
                ></i>
                <input
                  className="text w3lpass"
                  type={passwordVisible ? "text" : "password"}
                  {...register("password")}
                  id="password"
                  placeholder="Password"
                  required
                />
                <span style={{ color: "red" }}>{errors.password?.message}</span>
              </div>
              <button type="submit" className="tp-btn rounded-pill">
                Login
              </button>
              <p className="mt-2">
                <a href="/resetpassword" style={{ color: "blue" }}>
                  <u>Forgot Password</u>
                </a>
              </p>
            </form>
          </div>
        </div>
        <ul className="colorlib-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default LoginForm;
