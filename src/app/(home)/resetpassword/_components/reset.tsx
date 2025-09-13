"use client";
import React, { useState } from "react";
import "@/styles/css/registration.css";
import { resetPassword } from "../_actions/resetServerActions";
import {
  sendOtpOnMobileNo,
  verifyOtpOnMobileNo,
} from "../../settings/_actions/mobileServerAction";
import { useRouter } from "next/navigation";

// import axios from 'axios';

const ResetPassword = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [sendBtn, setSendBtn] = useState(true);
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await resetPassword(mobile, password); // Use the server action from the utility file
      setSuccessMessage("Password changed successfully.");
      setErrorMessage("");
      router.push("/login"); // Redirect to the login page after successful password change
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Failed To change Password"); // Use the Error's message property
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const sendOtp = async () => {
    if (mobile === "") {
      setErrorMessage("**Fill the mobile no");
      return;
    }

    try {
      const data = await sendOtpOnMobileNo(mobile); // Use the server action here
      if (data.status == 200) {
        setSuccessMessage("OTP sent successfully");
        setErrorMessage("");
        setOtpSent(true);
      } else {
        setErrorMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error occurred while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || isNaN(Number(otp))) {
      setErrorMessage("*Please enter a valid OTP");
      return;
    }

    try {
      const data = await verifyOtpOnMobileNo(mobile, otp); // Use the verifyOtp server action

      if (data.status === 200) {
        setSuccessMessage("Mobile number is verified.");
        setOtpSent(false); // Clear the session after successful verification
        setShowPasswordFields(true);
        setSendBtn(false);
      } else {
        setErrorMessage("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error occurred while verifying OTP");
    }
  };

  const handleResendOtp = () => {
    setOtp("");
    setErrorMessage("");
    sendOtp();
  };

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById(
      "password"
    ) as HTMLInputElement;
    passwordField.type =
      passwordField.type === "password" ? "text" : "password";
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="contact-area reset-password">
      <div className="content-area">
        <div
          className="left-col"
          style={{ backgroundImage: "url('/assets/images/contact-bg.jpg')" }}
        ></div>
        <div className="right-col">
          <div
            className="col-lg-6 offset-lg-6 col-md-12 col-12 wow fadeInRight"
            data-wow-duration="1s"
          >
            <div className="contact-right">
              <div className="top-content">
                <h3>
                  <span>Forgot Password</span>
                </h3>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
              </div>
              <div className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter Mobile No."
                    required
                  />
                </div>
                {otpSent ? (
                  <>
                    <div className="form-group">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                      />
                    </div>
                    <button
                      onClick={handleVerifyOtp}
                      className="tp-btn reset-btn rounded-pill mr-4"
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={handleResendOtp}
                      className="tp-btn reset-btn rounded-pill"
                    >
                      Resend OTP
                    </button>
                  </>
                ) : (
                  sendBtn && (
                    <div className="text-center" onClick={sendOtp}>
                      <button className="tp-btn reset-btn rounded-pill">
                        Send OTP
                      </button>
                    </div>
                  )
                )}
              </div>
              {showPasswordFields && (
                <form onSubmit={handlePasswordSubmit} className="mt-4">
                  <div className="form-group input-block">
                  <i
                  className={`fa ${
                    passwordVisible ? "fa-eye-slash" : "fa-eye"
                  } mt-3 togalcurrentpass`}
                  onClick={togglePasswordVisibility}
                ></i>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      id="password"
                      required
                    />
                  </div>
                  <div className="form-group contact-button">
                    <button
                      type="submit"
                      className="theme-btn rounded-pill ml-9"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
