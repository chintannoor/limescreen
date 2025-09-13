"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInputs, registerSchema } from "@/types/zodValidation";
import "@/styles/css/registration.css";
import {
  registerAction,
  sendOtpAction,
  verifyOtpAction,
} from "../_actions/registrationAction";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { loginAction } from "../../login/_actions/loginServerActions";

export default function RegisterForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleSendOtp = async () => {
    const isValid = await trigger([
      "fname",
      "lname",
      "email",
      "mobile",
      "password",
      "confirmPassword",
    ]);

    if (!isValid) return;

    const mobile = getValues("mobile");
    if (!mobile) {
      alert("Mobile not found.");
      return;
    }

    const result = await sendOtpAction(mobile);
    if (result.status === 200) {
      setOtpSent(true);
    } else {
      alert(result.message || "Failed to send OTP.");
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    handleSendOtp();
  }

  const handleOtpVerification = async () => {
    const mobile = getValues("mobile");
    if (!otp) {
      alert("Please enter the OTP.");
      return false;
    }
    if (!mobile) {
      alert("Mobile not found.");
      return false;
    }

    const result = await verifyOtpAction(otp, mobile);
    if (result.status === 200) {
      // setOtpSent(false);
      return true;
    } else {
      alert(result.message || "Invalid OTP.");
      return false;
    }
  };

  const handleFormSubmit = async (data: RegisterFormInputs) => {
    const isSuccess = await handleOtpVerification();
    if (!isSuccess) return;

    const result = await registerAction(data);
    if (result && !result.success) {
      console.error("Registration failed", result?.errors);
    } else {
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (loginResult?.error) {
        alert("Mobile/Email Already Registered, Please Login");
        router.push("/login");
      } else {
        const user = await loginAction(data);
        if (user.status == 400) {
          alert("Login failed");
        }
        router.push(`artist/edit/${user.data.id}`);
        alert("Registration Successful");
        setOtpSent(false);
      }
    }
  };

  const Togglepass = () => {
    const passInput = document.querySelector(
      'input[placeholder="Password"]'
    ) as HTMLInputElement;
    if (passInput) {
      passInput.type = passInput.type === "password" ? "text" : "password";
    }
    setPasswordVisible(!passwordVisible);
  };

  const Toggleconfirmpass = () => {
    const confirmPassInput = document.querySelector(
      'input[placeholder="Confirm-Password"]'
    ) as HTMLInputElement;
    if (confirmPassInput) {
      confirmPassInput.type =
        confirmPassInput.type === "password" ? "text" : "password";
    }
    setConfPasswordVisible(!confPasswordVisible);
  };

  return (
    <>
      <div className="main-w3layouts wrapper register-sec">
        <h1 className="reg-title">
          Register Now To Create Your Online Portfolio & Start Sharing Your
          Profile On Request.
        </h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              id="myForm"
              method="POST"
            >
              {!otpSent ? (
                <>
                  <input
                    className="text"
                    type="text"
                    placeholder="First Name"
                    {...register("fname")}
                    required
                  />
                  <span style={{ color: "red" }}>{errors.fname?.message}</span>

                  <input
                    className="text email"
                    type="text"
                    placeholder="Last Name"
                    {...register("lname")}
                    required
                  />
                  <span style={{ color: "red" }}>{errors.lname?.message}</span>

                  <input
                    className="text email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    required
                  />
                  <span style={{ color: "red" }}>{errors.email?.message}</span>

                  <input
                    className="text email"
                    type="text"
                    placeholder="Mobile"
                    {...register("mobile", { required: true })}
                    required
                  />
                  <span style={{ color: "red" }}>{errors.mobile?.message}</span>

                  <div className="input-block">
                    <i
                      className={`fa ${
                        passwordVisible ? "fa-eye-slash" : "fa-eye"
                      } mt-3 togalcurrentpass`}
                      onClick={Togglepass}
                    ></i>
                    <input
                      className="text email"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      required
                    />
                    <span style={{ color: "red" }}>
                      {errors.password?.message}
                    </span>
                  </div>

                  <div className="input-block">
                    <i
                      className={`fa ${
                        confPasswordVisible ? "fa-eye-slash" : "fa-eye"
                      } mt-3 togalcurrentpass`}
                      onClick={Toggleconfirmpass}
                    ></i>
                    <input
                      className="text w3lpass"
                      type={confPasswordVisible ? "text" : "password"}
                      placeholder="Confirm-Password"
                      {...register("confirmPassword")}
                      required
                    />
                    <span style={{ color: "red" }}>
                      {errors.confirmPassword?.message}
                    </span>
                  </div>

                  <div className="contact__btn-3 mt-10">
                    <div id="recaptcha-container"></div>
                    <button
                      type="button"
                      className="tp-btn rounded-pill"
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="text email"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <div className="grid-flow-col">
                    <button
                      type="submit"
                      className="tp-btn rounded-pill mr-1"
                      style={{ width: "46%" }}
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={handleResendOtp}
                      type="button"
                      className="tp-btn rounded-pill"
                      style={{ width: "51%" }}
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
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
    </>
  );
}
