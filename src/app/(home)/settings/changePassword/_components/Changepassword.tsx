"use client";
import Link from "next/link";
import "@/styles/css/registration.css";
import React, { useState } from "react";
import { changePassword } from "../_actions/passwordServerAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const changepassword = () => {
  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [oldPass, setOldPass] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [confNewPass, setConfNewPass] = useState(false);
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new_password !== newPasswordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      // Mock API call to change password
      const result = await changePassword(id!, current_password, new_password);
      if (result.status === 200) {
        setSuccess("Password changed successfully.");
        setCurrent_password("");
        setNew_password("");
        setNewPasswordConfirm("");
        setError("");
        router.refresh();
      } else {
        const data = await result.json();
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to change password. Please try again later.");
    }
  };

  const Toggleoldpass = () => {
    const passInput = document.querySelector(
      'input[placeholder="Password"]'
    ) as HTMLInputElement;
    if (passInput) {
      passInput.type = passInput.type === "password" ? "text" : "password";
    }
    setOldPass(!oldPass);
  };

  const Togglenewpass = () => {
    const passInput = document.querySelector(
      'input[placeholder="Password"]'
    ) as HTMLInputElement;
    if (passInput) {
      passInput.type = passInput.type === "password" ? "text" : "password";
    }
    setNewPass(!newPass);
  };

  const Toggleconfpass = () => {
    const passInput = document.querySelector(
      'input[placeholder="Password"]'
    ) as HTMLInputElement;
    if (passInput) {
      passInput.type = passInput.type === "password" ? "text" : "password";
    }
    setConfNewPass(!confNewPass);
  };
  return (
    <div className="container starter-template mt-5 mb-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link href="/settings" className="nav-link">
            Change Mobile No.
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/settings/changePassword" className="nav-link active">
            Change Password
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        <div id="menu1">
          <div className="main-w3layouts wrapper register-sec">
            <h3 className="text-white">
              <center>Change Password</center>
            </h3>
            <div className="main-agileinfo">
              <div className="agileits-top">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={onSubmit}>
                  <div className="input-block">
                    <i
                      className={`fa ${
                        oldPass ? "fa-eye-slash" : "fa-eye"
                      } mt-3 togalcurrentpass`}
                      onClick={Toggleoldpass}
                    ></i>
                    <input
                      className="rounded"
                      id="current-password"
                      name="current-password"
                      type={oldPass ? "text" : "password"}
                      placeholder="Enter old password"
                      value={current_password}
                      onChange={(e) => setCurrent_password(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-block">
                    <i
                      className={`fa ${
                        newPass ? "fa-eye-slash" : "fa-eye"
                      } mt-3 togalcurrentpass`}
                      onClick={Togglenewpass}
                    ></i>
                    <input
                      className="rounded"
                      id="new-password"
                      name="new-password"
                      type={newPass ? "text" : "password"}
                      placeholder="Enter new password"
                      value={new_password}
                      onChange={(e) => setNew_password(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-block">
                    <i
                      className={`fa ${
                        confNewPass ? "fa-eye-slash" : "fa-eye"
                      } mt-3 togalcurrentpass`}
                      onClick={Toggleconfpass}
                    ></i>
                    <input
                      className="rounded"
                      id="new-password-confirm"
                      name="new-password_confirmation"
                      type={confNewPass ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="tp-btn-10 rounded-pill">
                    Change Password
                  </button>
                </form>
              </div>
            </div>

            <ul className="colorlib-bubbles">
              {[...Array(10)].map((_, index) => (
                <li key={index}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default changepassword;
