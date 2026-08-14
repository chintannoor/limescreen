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
import { signIn, getSession } from "next-auth/react";

export default function RegisterForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [otpBusy, setOtpBusy] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleSendOtp = async () => {
    setFormError("");
    setFormMessage("");

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
      setFormError("Mobile number is required.");
      return;
    }

    setOtpBusy(true);
    try {
      const result = await sendOtpAction(mobile);
      if (result.status === 200) {
        setOtpSent(true);
        setFormMessage("OTP sent to your mobile number.");
      } else {
        setFormError(result.message || "Failed to send OTP.");
      }
    } finally {
      setOtpBusy(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    await handleSendOtp();
  };

  const handleOtpVerification = async () => {
    const mobile = getValues("mobile");
    if (!otp) {
      setFormError("Please enter the OTP.");
      return false;
    }
    if (!mobile) {
      setFormError("Mobile number is required.");
      return false;
    }

    const result = await verifyOtpAction(otp, mobile);
    if (result.status === 200) {
      return true;
    }

    setFormError(result.message || "Invalid OTP.");
    return false;
  };

  const handleFormSubmit = async (data: RegisterFormInputs) => {
    setFormError("");
    setFormMessage("");

    const isVerified = await handleOtpVerification();
    if (!isVerified) return;

    const result = await registerAction(data);
    if (!result.success) {
      setFormError(result.message || "Registration failed.");
      return;
    }

    const loginResult = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!loginResult || loginResult.error) {
      setFormError(
        "Your account was created, but automatic sign-in failed. Please log in."
      );
      router.push("/login");
      return;
    }

    const session = await getSession();
    const id = session?.user?.id;

    if (!id) {
      router.push("/login");
      return;
    }

    setOtpSent(false);
    router.push(`/artist/edit/${id}`);
  };

  const Togglepass = () => setPasswordVisible(!passwordVisible);
  const Toggleconfirmpass = () => setConfPasswordVisible(!confPasswordVisible);

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
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}
              {formMessage && (
                <div className="alert alert-success" role="status">
                  {formMessage}
                </div>
              )}
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
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Mobile"
                    {...register("mobile")}
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
                      disabled={otpBusy}
                    >
                      {otpBusy ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="text email"
                    type="text"
                    inputMode="numeric"
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button
                      onClick={handleResendOtp}
                      type="button"
                      className="tp-btn rounded-pill"
                      style={{ width: "51%" }}
                      disabled={otpBusy || isSubmitting}
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
