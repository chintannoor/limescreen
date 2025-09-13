"use client";
import Link from "next/link";
import { useState } from "react";
import {
  changeMobileNo,
  sendOtpOnMobileNo,
  verifyOtpOnMobileNo,
} from "../_actions/mobileServerAction";
import { useSession } from "next-auth/react";

const MobileNoChange = () => {
  const [message, setMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [mobileNo, setMobileNo] = useState(true);
  const [oldMobileNo, setOldMobileNo] = useState("");
  const [otpSession, setOtpSession] = useState(false);
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const { data: session } = useSession();

  const sendOtp = async () => {
    if (oldMobileNo === "") {
      setErrorMessage("**Fill the mobile no");
      return;
    }

    try {
      const data = await sendOtpOnMobileNo(oldMobileNo); // Use the server action here
      if (data.status === 200) {
        setOtpSession(data.otpSession); // Update session if provided by the API
        setMessage("OTP sent successfully");
        alert("OTP Is valid only for 60 Seconds");
        setWarningMessage("");
        setErrorMessage("");
        setOtpSession(true);
        setMobileNo(false);
      } else {
        setWarningMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error occurred while sending OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp || isNaN(Number(otp))) {
      setErrorMessage("*Please enter a valid OTP");
      return;
    }

    try {
      const result = await verifyOtpOnMobileNo(oldMobileNo, otp); // Use the verifyOtp server action

      if (result.status === 200) {
        setMessage("Mobile number is verified.");
        setIsOtpVerified(true);
        setOtpSession(false);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setWarningMessage("Error occurred while verifying OTP");
    }
  };

  const resendOtp = () => {
    setOtp("");
    setErrorMessage("");
    sendOtp();
  };

  const mobileNoChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session || !session.user.id) {
      setErrorMessage("User session is not available.");
      return;
    }

    if (isOtpVerified) {
      const result = await changeMobileNo(mobile, session.user.id); // Use the server action here
      try {
        if (result.status === 200) {
          setMessage("Mobile number is updated.");
          alert("Mobile Number Updated Successfully");
          setMobileNo(true);
          setIsOtpVerified(false);
          setOldMobileNo("");
          setMobile("");
        }
      } catch {
        setErrorMessage("Error occurred while updating mobile number");
        alert("Error updating mobile number");
      }
    }
  };

  return (
    <>
      <div className="container starter-template mt-5 mb-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link href="/settings" className="nav-link active">
              Change Mobile No.
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/settings/changePassword" className="nav-link">
              Change Password
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <div id="home">
            <div className="main-w3layouts wrapper register-sec">
              <h3 className="text-white">
                <center>Mobile No Change</center>
              </h3>
              <div className="main-agileinfo">
                <div className="agileits-top">
                  {message && (
                    <div
                      className="alert text-white"
                      style={{ backgroundColor: "#7EDD72" }}
                    >
                      {message}
                    </div>
                  )}
                  {warningMessage && (
                    <div
                      className="alert text-white"
                      style={{ backgroundColor: "red" }}
                    >
                      {warningMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  <form id="showsolddetailsmobilenochange">
                    {mobileNo && (
                      <>
                        <input
                          type="text"
                          id="mobile"
                          className="rounded"
                          value={oldMobileNo}
                          onChange={(e) => setOldMobileNo(e.target.value)}
                          placeholder="Enter Your Existing Mobile No. *"
                          required
                        />
                        <input type="hidden" id="nom" value="+91" />
                        <span id="mobileMsg" style={{ color: "red" }}></span>
                      </>
                    )}
                    {!otpSession && !isOtpVerified && (
                      <button
                        type="button"
                        className="tp-btn-10 rounded-pill"
                        onClick={sendOtp}
                        id="animalstatus"
                      >
                        Send OTP
                      </button>
                    )}
                    {otpSession && !isOtpVerified && (
                      <div className="otp-modal">
                        <h3>Enter OTP</h3>
                        <input
                          type="text"
                          id="otp-code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          required
                        />
                        <div className="grid-flow-col">
                          <button
                            onClick={verifyOtp}
                            type="button"
                            className="tp-btn rounded-pill mr-1"
                            style={{ width: "46%" }}
                          >
                            Verify OTP
                          </button>
                          <button
                            onClick={resendOtp}
                            type="button"
                            className="tp-btn rounded-pill"
                            style={{ width: "51%" }}
                          >
                            Resend OTP
                          </button>
                        </div>
                      </div>
                    )}

                    {isOtpVerified && (
                      <>
                        <input
                          type="text"
                          id="mobile"
                          className="rounded"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Enter New Mobile No. *"
                          required
                        />
                        <input type="hidden" id="nom" value="+91" />
                        <span id="mobileMsg" style={{ color: "red" }}></span>
                        <button
                          type="submit"
                          className="tp-btn rounded-pill"
                          disabled={!isOtpVerified}
                          onClick={mobileNoChange}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
              <p className="ajax-response"></p>
              <ul className="colorlib-bubbles">
                {[...Array(10)].map((_, i) => (
                  <li key={i}></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNoChange;
