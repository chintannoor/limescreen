"use client";
import React, { useState } from "react";
import "@/styles/css/registration.css";
import { resetPassword } from "../_actions/resetServerActions";
import {
  sendOtpOnMobileNo,
  verifyOtpOnMobileNo,
} from "../../settings/_actions/mobileServerAction";
import { forgotPasswordSchema } from "@/types/zodValidation";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [sendBtn, setSendBtn] = useState(true);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // The password rules were previously unenforced - any single character was
    // accepted and there was no confirmation field.
    const parsed = forgotPasswordSchema.safeParse({
      mobile,
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      setErrorMessage(
        parsed.error.errors[0]?.message || "Please check the details entered."
      );
      return;
    }

    setBusy(true);
    try {
      const result = await resetPassword(mobile, password);

      if (!result.success) {
        setErrorMessage(result.message || "Failed to change password.");
        return;
      }

      setSuccessMessage("Password changed successfully.");
      router.push("/login");
    } finally {
      setBusy(false);
    }
  };

  const sendOtp = async () => {
    setSuccessMessage("");

    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage("*Enter a valid 10 digit mobile number");
      return;
    }

    setBusy(true);
    try {
      const data = await sendOtpOnMobileNo(mobile);
      if (data.status === 200) {
        setSuccessMessage("OTP sent successfully");
        setErrorMessage("");
        setOtpSent(true);
      } else {
        setErrorMessage(data.message || "Failed to send OTP");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || isNaN(Number(otp))) {
      setErrorMessage("*Please enter a valid OTP");
      return;
    }

    setBusy(true);
    try {
      const data = await verifyOtpOnMobileNo(mobile, otp);

      if (data.status === 200) {
        setSuccessMessage("Mobile number is verified.");
        setErrorMessage("");
        setOtpSent(false);
        setShowPasswordFields(true);
        setSendBtn(false);
      } else {
        setErrorMessage(data.message || "Invalid OTP");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleResendOtp = () => {
    setOtp("");
    setErrorMessage("");
    sendOtp();
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter Mobile No."
                    disabled={showPasswordFields}
                    required
                  />
                </div>
                {otpSent ? (
                  <>
                    <div className="form-group">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={busy}
                      className="tp-btn reset-btn rounded-pill mr-4"
                    >
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={busy}
                      className="tp-btn reset-btn rounded-pill"
                    >
                      Resend OTP
                    </button>
                  </>
                ) : (
                  sendBtn && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={busy}
                        className="tp-btn reset-btn rounded-pill"
                      >
                        {busy ? "Sending..." : "Send OTP"}
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
                      placeholder="New Password"
                      id="password"
                      required
                    />
                  </div>
                  <div className="form-group input-block">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      id="confirmPassword"
                      required
                    />
                  </div>
                  <div className="form-group contact-button">
                    <button
                      type="submit"
                      disabled={busy}
                      className="theme-btn rounded-pill ml-9"
                    >
                      {busy ? "Saving..." : "Change Password"}
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
