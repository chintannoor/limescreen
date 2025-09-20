"use client";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { InitialDatas, InitialDataSchema } from "@/types/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIResponse } from "@/types/types";
import { sharedViewProfile } from "../_actions/viewProfileServerActions";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProfileData {
  status: number;
  data: {
    artist?: any;
    images?: any[];
    videos?: any[];
    country?: string;
    state?: string;
    city?: string;
    validate?: boolean;
    [key: string]: any;
  } | null;
  message: string;
}

interface SharedViewProfilePageProps {
  profileData: ProfileData;
}

const SharedViewProfilePage = () => {
  const [userData, setUserData] = useState<APIResponse["data"] | null>(null);
  const [activeTab, setActiveTab] = useState("education");
  const [visible, setVisible] = useState(false);
  const { reset } = useForm<InitialDatas>({
    resolver: zodResolver(InitialDataSchema),
  });
  const whatsappLink = `https://api.whatsapp.com/send?phone=${userData?.artist.wmobile}&text=Recently we have seen your profile would like to offer you some paid project.Kindly connect with us for further details..`;
  const params = useParams();
  const userlink = params.userlink as string;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userlink) {
          console.warn("UserLink is missing. Skipping fetch.");
          return;
        }

        // Fetch data from the given URL using GET method
        const response = await fetch(
          `https://admin.anantainternationals.com/api/${userlink}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch user profile data from API.");
          return;
        }
        const result = await response.json();

        if (!result || !result.data) {
          console.error("No valid user profile data received.");
          return;
        }

        setUserData(result.data);
        reset(result.data.artist);
        setUserData((prevData) => ({
          artist: {
            ...prevData?.artist,
            ...result.data.artist,
            file: result.data.artist.file || "",
          },
          images: result.data.images,
          videos: result.data.videos,
          country: result.data.country,
          state: result.data.state,
          city: result.data.city,
          validate: result.data.validate,
        }));
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    fetchData();
  }, [userlink, reset]);

  // Show button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* START HEADER AREA */}
      <div className="d-none d-xl-block header-style-2">
        <header className="rn-header-area d-flex align-items-start flex-column left-header-style">
          <div className="logo-area">
            <a>
              <img
                src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${userData?.artist.file}`}
                alt="personal-logo"
              />
            </a>
          </div>
          <nav
            id="sideNavs"
            className="mainmenu-nav navbar-example2 onepagenav"
          >
            <ul className="primary-menu nav nav-pills">
              <li className="nav-item current">
                <a className="nav-link smoth-animation-two" href="#home">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>{" "}
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#about">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-briefcase"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  About Me
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-layers"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Personal Information
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#images">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-users"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Images
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#videos">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Videos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#contacts">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-message-circle"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="footer">
            <div className="social-share-style-1">
              <span className="title">find with me</span>
              <ul className="social-share d-flex liststyle">
                <li className="facebook">
                  <a
                    href={
                      userData?.artist.facebook
                        ? userData.artist.facebook
                        : "https://facebook.com"
                    }
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </li>
                <li className="instagram">
                  <a
                    href={
                      userData?.artist.insta
                        ? userData.artist.insta
                        : "https://instagram.com"
                    }
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-instagram"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </li>
                <li className="linkedin">
                  <a
                    href={
                      userData?.artist.youtube
                        ? userData.artist.youtube
                        : "https://youtube.com"
                    }
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#FF3D00"
                        d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                      ></path>
                      <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                    </svg>
                  </a>
                </li>
                <li className="twitter">
                  <a
                    href={
                      userData?.artist.twitter
                        ? userData.artist.twitter
                        : "https://twitter.com"
                    }
                    target="_blank"
                  >
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 31.416 31.416"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M28.755,6.968l-0.47,0.149L25.782,7.34l-0.707,1.129l-0.513-0.163L22.57,6.51l-0.289-0.934L21.894,4.58l-1.252-1.123
            l-1.477-0.289l-0.034,0.676l1.447,1.412l0.708,0.834L20.49,6.506l-0.648-0.191L18.871,5.91l0.033-0.783l-1.274-0.524l-0.423,1.841
            l-1.284,0.291l0.127,1.027l1.673,0.322l0.289-1.641l1.381,0.204l0.642,0.376h1.03l0.705,1.412l1.869,1.896l-0.137,0.737
            l-1.507-0.192l-2.604,1.315l-1.875,2.249l-0.244,0.996h-0.673l-1.254-0.578l-1.218,0.578l0.303,1.285l0.53-0.611l0.932-0.029
            l-0.065,1.154l0.772,0.226l0.771,0.866l1.259-0.354l1.438,0.227l1.67,0.449l0.834,0.098l1.414,1.605l2.729,1.605l-1.765,3.372
            l-1.863,0.866l-0.707,1.927l-2.696,1.8l-0.287,1.038c6.892-1.66,12.019-7.851,12.019-15.253
            C31.413,12.474,30.433,9.465,28.755,6.968z"
                          />
                          <path
                            d="M17.515,23.917l-1.144-2.121l1.05-2.188l-1.05-0.314l-1.179-1.184l-2.612-0.586l-0.867-1.814v1.077h-0.382l-2.251-3.052
            v-2.507L7.43,8.545L4.81,9.012H3.045L2.157,8.43L3.29,7.532L2.16,7.793c-1.362,2.326-2.156,5.025-2.156,7.916
            c0,8.673,7.031,15.707,15.705,15.707c0.668,0,1.323-0.059,1.971-0.137l-0.164-1.903c0,0,0.721-2.826,0.721-2.922
            C18.236,26.357,17.515,23.917,17.515,23.917z"
                          />
                          <path
                            d="M5.84,5.065l2.79-0.389l1.286-0.705l1.447,0.417l2.312-0.128l0.792-1.245l1.155,0.19l2.805-0.263L19.2,2.09l1.09-0.728
            l1.542,0.232l0.562-0.085C20.363,0.553,18.103,0,15.708,0C10.833,0,6.474,2.222,3.596,5.711h0.008L5.84,5.065z M16.372,1.562
            l1.604-0.883l1.03,0.595l-1.491,1.135l-1.424,0.143l-0.641-0.416L16.372,1.562z M11.621,1.691l0.708,0.295l0.927-0.295
            l0.505,0.875l-2.14,0.562l-1.029-0.602C10.591,2.526,11.598,1.878,11.621,1.691z"
                          />
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>
      {/* START HEADER AREA END 
      HEADER MOBILE BAR */}
      <div className="header-style-2 d-block d-xl-none">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-6">
            <div className="logo">
              <Link href="/">
                <img
                  src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${userData?.artist.file}`}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="col-6">
            <div className="header-right text-end">
              <div className="hamberger-menu">
                <div id="menuBtn" className="feather-menu humberger-menu">
                  <svg
                    fill="#ffffff"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 150 150"
                    xmlSpace="preserve"
                  >
                    <g id="XMLID_240_">
                      <path
                        id="XMLID_241_"
                        d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"
                      ></path>
                      <path
                        id="XMLID_242_"
                        d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"
                      ></path>
                      <path
                        id="XMLID_243_"
                        d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* HEADER MOBILE BAR END   
      START POPUP MOBILE MENU    */}
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="menu-top">
            <div className="menu-header">
              <Link href="/" className="logo">
                <img
                  src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${userData?.artist.file}`}
                  alt="Personal Portfolio"
                />
              </Link>
              <div className="close-button">
                <button className="close-menu-activation close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="content">
            <ul className="primary-menu nav nav-pills">
              <li className="nav-item">
                <a className="nav-link smoth-animation-two active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#about">
                  About Me
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#info">
                  Information
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#images">
                  Images
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#videos">
                  Videos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link smoth-animation-two" href="#contacts">
                  Contact
                </a>
              </li>
            </ul>
            <div className="social-share-style-1 mt--40">
              <span className="title">find with me</span>
              <ul className="social-share d-flex liststyle">
                <li className="facebook">
                  <a
                    href={userData?.artist.facebook || "https://facebook.com"}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </li>
                <li className="instagram">
                  <a
                    href={userData?.artist.insta || "https://instagram.com"}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-instagram"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </li>
                <li className="linkedin">
                  <a
                    href={userData?.artist.youtube || "https://youtube.com"}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#FF3D00"
                        d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                      ></path>
                      <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                    </svg>
                  </a>
                </li>
                <li className="twitter">
                  <a
                    href={userData?.artist.twitter || "https://twitter.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 31.416 31.416"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M28.755,6.968l-0.47,0.149L25.782,7.34l-0.707,1.129l-0.513-0.163L22.57,6.51l-0.289-0.934L21.894,4.58l-1.252-1.123
            l-1.477-0.289l-0.034,0.676l1.447,1.412l0.708,0.834L20.49,6.506l-0.648-0.191L18.871,5.91l0.033-0.783l-1.274-0.524l-0.423,1.841
            l-1.284,0.291l0.127,1.027l1.673,0.322l0.289-1.641l1.381,0.204l0.642,0.376h1.03l0.705,1.412l1.869,1.896l-0.137,0.737
            l-1.507-0.192l-2.604,1.315l-1.875,2.249l-0.244,0.996h-0.673l-1.254-0.578l-1.218,0.578l0.303,1.285l0.53-0.611l0.932-0.029
            l-0.065,1.154l0.772,0.226l0.771,0.866l1.259-0.354l1.438,0.227l1.67,0.449l0.834,0.098l1.414,1.605l2.729,1.605l-1.765,3.372
            l-1.863,0.866l-0.707,1.927l-2.696,1.8l-0.287,1.038c6.892-1.66,12.019-7.851,12.019-15.253
            C31.413,12.474,30.433,9.465,28.755,6.968z"
                          />
                          <path
                            d="M17.515,23.917l-1.144-2.121l1.05-2.188l-1.05-0.314l-1.179-1.184l-2.612-0.586l-0.867-1.814v1.077h-0.382l-2.251-3.052
            v-2.507L7.43,8.545L4.81,9.012H3.045L2.157,8.43L3.29,7.532L2.16,7.793c-1.362,2.326-2.156,5.025-2.156,7.916
            c0,8.673,7.031,15.707,15.705,15.707c0.668,0,1.323-0.059,1.971-0.137l-0.164-1.903c0,0,0.721-2.826,0.721-2.922
            C18.236,26.357,17.515,23.917,17.515,23.917z"
                          />
                          <path
                            d="M5.84,5.065l2.79-0.389l1.286-0.705l1.447,0.417l2.312-0.128l0.792-1.245l1.155,0.19l2.805-0.263L19.2,2.09l1.09-0.728
            l1.542,0.232l0.562-0.085C20.363,0.553,18.103,0,15.708,0C10.833,0,6.474,2.222,3.596,5.711h0.008L5.84,5.065z M16.372,1.562
            l1.604-0.883l1.03,0.595l-1.491,1.135l-1.424,0.143l-0.641-0.416L16.372,1.562z M11.621,1.691l0.708,0.295l0.927-0.295
            l0.505,0.875l-2.14,0.562l-1.029-0.602C10.591,2.526,11.598,1.878,11.621,1.691z"
                          />
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* END POPUP MOBILE MENU  */}
      <main className="page-wrapper-two">
        {/* start slider area */}
        <section
          id="home"
          className="slider-style-5 rn-section-gap pb--110 align-items-center with-particles"
        >
          <div id="particles-js">
            <canvas
              className="particles-js-canvas-el"
              width="1572"
              height="929"
              style={{ width: "100%", height: "100%" }}
            ></canvas>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner-inner">
                  <div className="thumbnail gradient-border gradient-animation">
                    <img
                      id="border"
                      className="gradient-border"
                      src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${userData?.artist.file}`}
                      alt="User"
                    />
                  </div>
                  <h1>
                    {userData?.artist.fname}&nbsp;{userData?.artist.lname}
                  </h1>
                  {/* type headline start */}
                  <span className="cd-headline clip is-full-width">
                    <span>I am a </span>
                    {/* ROTATING TEXT */}
                    <span className="cd-words-wrapper">
                      <b className="is-visible ml-4">
                        {userData?.artist.category}.
                      </b>
                      {userData?.artist.juniormodel ? (
                        <b className="is-hidden ml-4">
                          {userData.artist.juniormodel}.
                        </b>
                      ) : (
                        <b className="is-hidden ml-4">
                          {userData?.artist.junioractor}.
                        </b>
                      )}
                    </span>
                  </span>
                  <div className="short-desc">
                    <p>{userData?.artist.short_description}</p>
                  </div>
                  {/* type headline end */}
                  <div className="button-area">
                    <Link href="#contacts" className="rn-btn">
                      <span>CONTACT ME</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end slider area */}

        {/* Start About Area */}
        <div
          id="about"
          className="rn-about-area section-separator rn-section-gap"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Our Information</span>
                  <h2 className="title">About Me</h2>
                </div>
              </div>
              <div className="col-lg-12 about-info">
                <div className="about-text">
                  <h3>
                    {userData?.artist.juniormodel
                      ? `I'm a ${userData.artist.juniormodel} with Many years of experience.`
                      : `I'm a ${userData?.artist.junioractor} with Many years of experience.`}
                  </h3>
                  <p>{userData?.artist.description}</p>
                  <div className="btn-bar">
                    <Link href="#contacts" className="rn-btn">
                      <span>Contact Me</span>
                    </Link>
                    <Link href="#images" className="rn-btn">
                      <span>Portfolio</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End About Area */}
        {/* START RESUME AREA */}
        <div
          className="rn-resume-area rn-section-gap section-separator"
          id="info"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2 className="title">Personal Information</h2>
                </div>
              </div>
            </div>

            <div className="row mt--45">
              <div className="col-lg-12">
                <ul
                  className="rn-nav-list nav nav-tabs"
                  id="myTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "education" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("education")}
                      id="education-tab"
                      data-bs-toggle="tab"
                      href="#education"
                      role="tab"
                      aria-controls="education"
                      aria-selected="true"
                    >
                      Personal Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "professional" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("professional")}
                      id="professional-tab"
                      data-bs-toggle="tab"
                      href="#professional"
                      role="tab"
                      aria-controls="professional"
                      aria-selected="false"
                    >
                      Body Measurement
                    </a>
                  </li>
                  {userData?.artist.category === "model" ? (
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "modeling_experience" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("modeling_experience")}
                        id="experience-tab"
                        data-bs-toggle="tab"
                        href="#experience"
                        role="tab"
                        aria-controls="experience"
                        aria-selected="false"
                      >
                        {userData?.artist.category} Info
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "acting_experience" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("acting_experience")}
                        id="experience-tab"
                        data-bs-toggle="tab"
                        href="#experience"
                        role="tab"
                        aria-controls="experience"
                        aria-selected="false"
                      >
                        {userData?.artist.category} Info
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "interview" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("interview")}
                      id="interview-tab"
                      data-bs-toggle="tab"
                      href="#interview"
                      role="tab"
                      aria-controls="interview"
                      aria-selected="false"
                    >
                      Experience
                    </a>
                  </li>
                </ul>

                <div className="rn-nav-content tab-content" id="myTabContents">
                  {/* Personal Information Tab */}
                  {activeTab === "education" ? (
                    <div
                      className="tab-pane show active fade"
                      id="education"
                      role="tabpanel"
                      aria-labelledby="education-tab"
                    >
                      <div className="personal-experience-inner mt--40">
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Name:</div>
                            <div className="value">
                              {userData?.artist.fname} {userData?.artist.lname}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Father Name:</div>
                            <div className="value">
                              {userData?.artist.father}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Mother Name:</div>
                            <div className="value">
                              {userData?.artist.mother}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Date Of Birth:</div>
                            <div className="value">{userData?.artist.dob}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Occupation:</div>
                            <div className="value">
                              {userData?.artist.juniormodel ||
                                userData?.artist.junioractor}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Email:</div>
                            <div className="value">
                              {userData?.artist.email}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Phone:</div>
                            {userData?.artist.show_number && (
                              <div className="value">
                                +91 {userData.artist.mobile}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Country:</div>
                            <div className="value">{userData?.country}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">City:</div>
                            <div className="value">{userData?.city}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">State:</div>
                            <div className="value">{userData?.state}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Pincode:</div>
                            <div className="value">
                              {userData?.artist.pincode}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === "professional" ? (
                    <div
                      className="tab-pane show active fade"
                      id="professional"
                      role="tabpanel"
                      aria-labelledby="professional-tab"
                    >
                      <div className="personal-experience-inner mt--40">
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Height:</div>
                            <div className="value">
                              {userData?.artist.height}
                            </div>
                          </div>
                        </div>
                        {/* Other body measurements */}
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Weight:</div>
                            <div className="value">
                              {userData?.artist.weight} kg
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Bust:</div>
                            <div className="value">{userData?.artist.bust}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Waist:</div>
                            <div className="value">
                              {userData?.artist.waist}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Hips:</div>
                            <div className="value">{userData?.artist.hips}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Skin Color:</div>
                            <div className="value">
                              {userData?.artist.skincolor}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Eye Color:</div>
                            <div className="value">
                              {userData?.artist.eyecolor}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Hair Color:</div>
                            <div className="value">
                              {userData?.artist.haircolor}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Clothing Size:</div>
                            <div className="value">
                              {userData?.artist.cloth}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Shoes Size:</div>
                            <div className="value">
                              {userData?.artist.shoes} number
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === "acting_experience" ? (
                    <div
                      className="tab-pane show active fade"
                      id="experience"
                      role="tabpanel"
                      aria-labelledby="experience-tab"
                    >
                      <div className="personal-experience-inner mt--40">
                        {/* Experience content */}
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Classic Acting:</div>
                            <div className="value">
                              {userData?.artist.classic}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Method Acting :</div>
                            <div className="value">
                              {userData?.artist.method}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">
                              Practical Aesthetic Method:
                            </div>
                            <div className="value">
                              {userData?.artist.practical}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">
                              Theatre Stanislavski's Method:
                            </div>
                            <div className="value">
                              {userData?.artist.theatre}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Meisner Technique:</div>
                            <div className="value">
                              {userData?.artist.meisner}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Lee Strasberg's Method:</div>
                            <div className="value">
                              {userData?.artist.strasberg}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Leading Actor:</div>
                            <div className="value">
                              {userData?.artist.leading}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Character Actor:</div>
                            <div className="value">
                              {userData?.artist.character}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">
                              Presentational & Representational:
                            </div>
                            <div className="value">
                              {userData?.artist.presentational}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === "modeling_experience" ? (
                    <div
                      className="tab-pane show active fade"
                      id="experience"
                      role="tabpanel"
                      aria-labelledby="experience-tab"
                    >
                      <div className="personal-experience-inner mt--40">
                        {/* Experience content */}
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Fashion / Casual Wear :</div>
                            <div className="value">
                              {userData?.artist.fashion}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Sport / Fitness :</div>
                            <div className="value">
                              {userData?.artist.sport}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Swimwear :</div>
                            <div className="value">
                              {userData?.artist.swimwear}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Lingerie :</div>
                            <div className="value">
                              {userData?.artist.lingerie}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Promotional Work :</div>
                            <div className="value">
                              {userData?.artist.promotional}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Half Dressed :</div>
                            <div className="value">
                              {userData?.artist.dressed}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Magazine Work :</div>
                            <div className="value">
                              {userData?.artist.magazine}
                            </div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Ramp Walk :</div>
                            <div className="value">{userData?.artist.ramp}</div>
                          </div>
                        </div>
                        <div className="personal-info">
                          <div className="poersonal-tab">
                            <div className="info">Others :</div>
                            <div className="value">
                              {userData?.artist.others}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === "interview" ? (
                    <div
                      className="tab-pane show active fade"
                      id="interview"
                      role="tabpanel"
                      aria-labelledby="interview-tab"
                    >
                      <div className="personal-experience-inner mt--40">
                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-12">
                            <div className="content">
                              <h4 className="maintitle">My Experience</h4>
                              <div className="experience-list">
                                <div
                                  data-aos="fade-up"
                                  data-aos-duration="500"
                                  data-aos-delay="300"
                                  data-aos-once="true"
                                  className="resume-single-list aos-init aos-animate"
                                >
                                  <div className="inner">
                                    <div className="heading">
                                      <div className="title">
                                        <h4>{userData?.artist.exp_title}</h4>
                                        {/* <span>University of DVI (1997 - 2001)</span> */}
                                      </div>
                                    </div>
                                    <div className="description">
                                      <p className="description">
                                        {userData?.artist.experiance}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>No Data Avavilable </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Resume Area 
        Start Client Area */}
        <div
          className="rn-client-area rn-client-area-image rn-section-gap section-separator"
          id="images"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Popular Images</span>
                  <h2 className="title">My Images</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt--50 mt_md--40 mt_sm--40">
              <div className="col-lg-12">
                <div className="tab-area">
                  <div className="">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div className="client-card">
                        {userData?.images && userData.images.length > 0 ? (
                          userData.images.map((image, index) => (
                            <div key={index} className="main-content">
                              <div className="inner text-center">
                                <div
                                  className="thumbnail gallery-image"
                                  data-fancybox="gallery"
                                >
                                  <a
                                    href={`https://my-limescreen.s3.eu-north-1.amazonaws.com${image.images}`}
                                  >
                                    <img
                                      src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${image.images}`}
                                      alt={`Client-image-${index}`}
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No images available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="rn-client-area rn-section-gap section-separator"
          id="videos"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Popular Videos</span>
                  <h2 className="title">My Videos</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt--50 mt_md--40 mt_sm--40">
              <div className="col-lg-12">
                <div className="tab-area">
                  <div className="">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div className="client-card">
                        {userData?.videos && userData.videos.length > 0 ? (
                          userData.videos.map((video, index) => (
                            <div key={index} className="main-content">
                              <div className="inner text-center">
                                <video width="150" height="200" controls>
                                  <source
                                    src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${video.videos}`}
                                    type="video/mp4"
                                  />
                                </video>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No videos available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Client Area 
        Start Contact Area */}
        <div
          className="rn-contact-area rn-section-gap section-separator"
          id="contacts"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Contact</span>
                  <h2 className="title">Contact With Me</h2>
                </div>
              </div>
            </div>
            <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
              <div className="col-lg-12">
                <div className="contact-about-area">
                  <div className="col-lg-6">
                    <div className="thumbnail">
                      <img
                        src="/assets/images/main-logo.png"
                        alt="contact-img"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="title-area">
                      <h4 className="title">
                        {userData?.artist.fname} {userData?.artist.lname}
                      </h4>
                      <span>{userData?.artist.category}</span>
                    </div>
                    <div className="description">
                      <p>Connect with me.</p>
                      <span className="phone">
                        Phone:
                        {userData?.artist.show_number?.toString() === "1" && (
                          <a href={`tel:+91${userData.artist.mobile}`}>
                            +91 {userData.artist.mobile}
                          </a>
                        )}
                      </span>
                      <span className="mail">
                        Email:{" "}
                        <a href={`mailTo:${userData?.artist.email}`}>
                          {userData?.artist.email}
                        </a>
                      </span>
                    </div>
                    <div className="social-area">
                      <div className="name">FIND WITH ME</div>
                      <div className="social-icone">
                        <a
                          href={
                            userData?.artist.facebook || "https://facebook.com"
                          }
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-facebook"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                        <a
                          href={
                            userData?.artist.insta || "https://instagram.com"
                          }
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a
                          href={
                            userData?.artist.youtube || "https://youtube.com"
                          }
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="48px"
                            height="48px"
                          >
                            <path
                              fill="#FF3D00"
                              d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                            ></path>
                            <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                          </svg>
                        </a>
                        <a
                          href={
                            userData?.artist.twitter || "https://twitter.com"
                          }
                          target="_blank"
                        >
                          <svg
                            fill="#000000"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 31.416 31.416"
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M28.755,6.968l-0.47,0.149L25.782,7.34l-0.707,1.129l-0.513-0.163L22.57,6.51l-0.289-0.934L21.894,4.58l-1.252-1.123
            l-1.477-0.289l-0.034,0.676l1.447,1.412l0.708,0.834L20.49,6.506l-0.648-0.191L18.871,5.91l0.033-0.783l-1.274-0.524l-0.423,1.841
            l-1.284,0.291l0.127,1.027l1.673,0.322l0.289-1.641l1.381,0.204l0.642,0.376h1.03l0.705,1.412l1.869,1.896l-0.137,0.737
            l-1.507-0.192l-2.604,1.315l-1.875,2.249l-0.244,0.996h-0.673l-1.254-0.578l-1.218,0.578l0.303,1.285l0.53-0.611l0.932-0.029
            l-0.065,1.154l0.772,0.226l0.771,0.866l1.259-0.354l1.438,0.227l1.67,0.449l0.834,0.098l1.414,1.605l2.729,1.605l-1.765,3.372
            l-1.863,0.866l-0.707,1.927l-2.696,1.8l-0.287,1.038c6.892-1.66,12.019-7.851,12.019-15.253
            C31.413,12.474,30.433,9.465,28.755,6.968z"
                                />
                                <path
                                  d="M17.515,23.917l-1.144-2.121l1.05-2.188l-1.05-0.314l-1.179-1.184l-2.612-0.586l-0.867-1.814v1.077h-0.382l-2.251-3.052
            v-2.507L7.43,8.545L4.81,9.012H3.045L2.157,8.43L3.29,7.532L2.16,7.793c-1.362,2.326-2.156,5.025-2.156,7.916
            c0,8.673,7.031,15.707,15.705,15.707c0.668,0,1.323-0.059,1.971-0.137l-0.164-1.903c0,0,0.721-2.826,0.721-2.922
            C18.236,26.357,17.515,23.917,17.515,23.917z"
                                />
                                <path
                                  d="M5.84,5.065l2.79-0.389l1.286-0.705l1.447,0.417l2.312-0.128l0.792-1.245l1.155,0.19l2.805-0.263L19.2,2.09l1.09-0.728
            l1.542,0.232l0.562-0.085C20.363,0.553,18.103,0,15.708,0C10.833,0,6.474,2.222,3.596,5.711h0.008L5.84,5.065z M16.372,1.562
            l1.604-0.883l1.03,0.595l-1.491,1.135l-1.424,0.143l-0.641-0.416L16.372,1.562z M11.621,1.691l0.708,0.295l0.927-0.295
            l0.505,0.875l-2.14,0.562l-1.029-0.602C10.591,2.526,11.598,1.878,11.621,1.691z"
                                />
                              </g>
                            </g>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Contact Area */}
        {userData?.artist.show_number?.toString() === "1" && (
          <a
            href={whatsappLink}
            className="float whatsapp-icon mb-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="whatsapp-img"
              src="/assets/images/whatsapp.gif"
              alt="slide"
            />
          </a>
        )}

        <div
          className="backto-top"
          style={visible ? { opacity: 1 } : { opacity: 0 }}
          onClick={scrollToTop}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-up"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
        </div>
      </main>
    </>
  );
};

export default SharedViewProfilePage;
