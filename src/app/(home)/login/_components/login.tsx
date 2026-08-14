"use client";
import React, { useState } from "react";
import "@/styles/css/registration.css";
import { LoginFormInputs, loginSchema } from "@/types/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    setFormError("");

    // A single sign-in call: `authorize` in the NextAuth options already runs
    // loginAction server-side, so calling it here as well doubled every login.
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result || result.error) {
      setFormError(
        result?.error && result.error !== "CredentialsSignin"
          ? result.error
          : "Invalid email/mobile number or password."
      );
      return;
    }

    const session = await getSession();
    const id = session?.user?.id;

    if (!id) {
      setFormError("Signed in, but the profile could not be loaded. Please try again.");
      return;
    }

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
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}
              <input
                className="text"
                type="text"
                {...register("email")}
                placeholder="Enter email or mobile no"
                required
              />
              <span style={{ color: "red" }}>{errors.email?.message}</span>
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
              <button
                type="submit"
                className="tp-btn rounded-pill"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <p className="mt-2">
                <Link href="/resetpassword" style={{ color: "blue" }}>
                  <u>Forgot Password</u>
                </Link>
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
