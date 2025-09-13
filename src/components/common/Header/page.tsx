"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { APIResponse, HeaderResponse } from "@/types/types";
import { editProfile } from "@/app/(artist)/artist/edit/[id]/_actions/editServerActions";

const Header = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<HeaderResponse["artist"] | null>(
    null
  );
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const id = session?.user.id || null;
  useEffect(() => {
    const fetchData = async () => {
      setFormData(null);
      try {
        if (!id) return;

        const result = (await editProfile(id.toString())) as APIResponse;
        const artistData = result.data.artist;

        // Set form state only with artist data
        setFormData({
          ...artistData,
          file: artistData.file || "", // Ensure file is never undefined
        });
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const copyText = () => {
    if (typeof window === "undefined") return; // ensure it's client-side
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      alert("Clipboard not supported in this browser");
      return;
    }

    const userLink = session?.user?.link;
    if (!userLink) {
      alert("No link found to copy");
      return;
    }

    navigator.clipboard
      .writeText(`https://limescreen.net/${userLink}`)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy link");
      });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="header-inner-top">
              <div className="header-inner">
                <div className="row">
                  <div className="col-lg-2 col-md-12 col-sm-12 col-12 ">
                    <div className="logo">
                      {!session ? (
                        <Link href="/" className="logo-1">
                          <img
                            src="/assets/images/main-logo.png"
                            alt="image logo"
                          />
                        </Link>
                      ) : (
                        <img
                          src="/assets/images/main-logo.png"
                          alt="image logo"
                        />
                      )}
                    </div>
                    <div className="mobile-nav">
                      <div className="slicknav_menu">
                        <a
                          href="#"
                          aria-haspopup="true"
                          role="button"
                          tabIndex={0}
                          className="slicknav_btn"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor behavior
                            handleMenuToggle();
                          }}
                        >
                          <span className="slicknav_menutxt"></span>
                          <span className="slicknav_icon slicknav_no-text">
                            <span className="slicknav_icon-bar"></span>
                            <span className="slicknav_icon-bar"></span>
                            <span className="slicknav_icon-bar"></span>
                          </span>
                        </a>
                        <ul
                          className="slicknav_nav nav-menu navigation"
                          aria-hidden={!isMenuOpen}
                          role="menu"
                          style={{ display: isMenuOpen ? "block" : "none" }}
                        >
                          {session?.user.id ? (
                            <div
                              className="img-dropdown dropdown"
                              style={{ position: "relative" }}
                            >
                              <button
                                className="btn btn-secondary dropdown-toggle theme-btn rounded-pill"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <img
                                  src={`https://admin.limescreen.net${session?.user.file}`}
                                  alt="profile-photo"
                                  className="mr-2 rounded"
                                />
                                {session?.user.fname}
                              </button>
                              <div
                                className="dropdown-menu"
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  minWidth: "400px",
                                  backgroundColor: "#fff",
                                  border: "1px solid #ddd",
                                  borderRadius: "5px",
                                  marginTop: "5px",
                                  padding: "0",
                                  listStyle: "none",
                                  boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
                                  zIndex: 1000,
                                }}
                              >
                                <li>
                                  <Link
                                    href={`/profile/${session?.user.link}`}
                                    style={{
                                      height: "20px",
                                      fontSize: "15px",
                                    }}
                                    className="theme-btn ml-2"
                                  >
                                    View Profile
                                  </Link>
                                </li>
                                {!formData?.token && (
                                  <li>
                                    <Link
                                      href={`/linkgenerate/${session?.user.id}`}
                                      style={{
                                        height: "20px",
                                        fontSize: "15px",
                                      }}
                                      className="theme-btn ml-2"
                                    >
                                      Generate Link
                                    </Link>
                                  </li>
                                )}
                                <li>
                                  <Link
                                    href={`/artist/edit/${session?.user.id}`}
                                    style={{
                                      height: "20px",
                                      fontSize: "15px",
                                    }}
                                    className="theme-btn ml-2 mt-0"
                                  >
                                    Edit Profile
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/settings"
                                    className="theme-btn ml-2"
                                    style={{
                                      height: "20px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    Setting
                                  </Link>
                                </li>
                                {formData?.token && (
                                  <li>
                                    <button
                                      className="theme-btn text-left"
                                      style={{
                                        color: "#555",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                      }}
                                      onClick={copyText}
                                    >
                                      <span style={{ marginTop: "auto" }}>
                                        Copy Link
                                      </span>
                                    </button>
                                  </li>
                                )}
                                <li>
                                  <button
                                    className="theme-btn text-left"
                                    style={{ color: "#555" }}
                                    onClick={() =>
                                      signOut({ callbackUrl: "/" })
                                    }
                                  >
                                    Log Out
                                  </button>
                                </li>
                              </div>
                            </div>
                          ) : (
                            <>
                              <li style={{ height: "50px", fontSize: "15px" }}>
                                <Link href="/">Home</Link>
                              </li>
                              <li style={{ height: "50px", fontSize: "15px" }}>
                                <Link href="/contact">Contact</Link>
                              </li>
                              <li style={{ height: "50px", fontSize: "15px" }}>
                                <Link href="/artist">Artist</Link>
                              </li>
                              <li style={{ height: "50px", fontSize: "15px" }}>
                                <Link href="/registration">
                                  Create Portfolio
                                </Link>
                              </li>
                              <li style={{ height: "50px", fontSize: "15px" }}>
                                <Link href="/login">Login</Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-5 col-12">
                    <div className="main-menu-top">
                      <div className="main-menu">
                        <div className="navbar">
                          <div className="nav-item">
                            <ul className="nav-menu mobile-menu navigation">
                              {session?.user.id ? (
                                <div className="img-dropdown dropdown">
                                  <button
                                    className="btn btn-secondary dropdown-toggle theme-btn rounded-pill"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <img
                                      src={`https://admin.limescreen.net${session?.user.file}`}
                                      alt="profile-photo"
                                      className="mr-2 rounded"
                                    />
                                    {session?.user.fname}
                                  </button>
                                  <div className="dropdown-menu">
                                    <li>
                                      <Link
                                        href={`/profile/${session?.user.link}`}
                                        className="theme-btn"
                                      >
                                        View Profile
                                      </Link>
                                    </li>
                                    {!formData?.token && (
                                      <li>
                                        <Link
                                          href={`/linkgenerate/${session?.user.id}`}
                                          className="theme-btn"
                                        >
                                          Generate Link
                                        </Link>
                                      </li>
                                    )}
                                    <li>
                                      <Link
                                        href={`/artist/edit/${session?.user.id}`}
                                        className="theme-btn"
                                      >
                                        Edit Profile
                                      </Link>
                                    </li>
                                    {formData?.token && (
                                      <li>
                                        <button
                                          className="theme-btn"
                                          onClick={copyText}
                                        >
                                          Copy Link
                                        </button>
                                      </li>
                                    )}
                                    <li>
                                      <Link
                                        href="/settings"
                                        className="theme-btn"
                                      >
                                        Setting
                                      </Link>
                                    </li>
                                    <li>
                                      <button
                                        className="theme-btn text-left"
                                        onClick={() =>
                                          signOut({ callbackUrl: "/" })
                                        }
                                      >
                                        Log Out
                                      </button>
                                    </li>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <li
                                    className={`nav-link ${
                                      pathname === "/" ? "active" : ""
                                    } relative`}
                                  >
                                    <Link className="navLine" href="/">Home</Link>
                                  </li>
                                  <li
                                    className={`nav-link ${
                                      pathname === "/contact" ? "active" : ""
                                    } relative`}
                                  >
                                    <Link className="navLine" href="/contact">Contact</Link>
                                  </li>
                                  <li
                                    className={`nav-link ${
                                      pathname === "/artist" ? "active" : ""
                                    } relative`}
                                  >
                                    <Link className="navLine" href="/artist">Artist</Link>
                                  </li>
                                  <li className="nav-link hidden">
                                    <Link
                                      href="/registration"
                                      className="hidden"
                                    >
                                      Create Portfolio
                                    </Link>
                                  </li>
                                  <li className="nav-link hidden">
                                    <Link href="/login" className="hidden">
                                      Login
                                    </Link>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="menu-right ">
                      {session?.user.id ? (
                        <div className="img-dropdown dropdown">
                          <button
                            className="dropdown-toggle theme-btn rounded-pill"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <img
                              src={`https://admin.limescreen.net${session?.user.file}`}
                              alt="profile-photo"
                              className="mr-2 rounded"
                            />
                            {session?.user.fname}
                          </button>
                          <div className="dropdown-menu">
                            <li>
                              <Link
                                href={`/profile/${session?.user.link}`}
                                className="theme-btn"
                              >
                                View Profile
                              </Link>
                            </li>
                            {!formData?.token && (
                              <li>
                                <Link
                                  href={`/linkgenerate/${session?.user.id}`}
                                  className="theme-btn"
                                >
                                  Generate Link
                                </Link>
                              </li>
                            )}
                            <li>
                              <Link
                                href={`/artist/edit/${session?.user.id}`}
                                className="theme-btn"
                              >
                                Edit Profile
                              </Link>
                            </li>
                            {formData?.token && (
                              <li>
                                <button
                                  className="theme-btn"
                                  onClick={copyText}
                                >
                                  Copy Link
                                </button>
                              </li>
                            )}
                            <li>
                              <Link href="/settings" className="theme-btn">
                                Setting
                              </Link>
                            </li>
                            <li>
                              <button
                                className="theme-btn text-left"
                                onClick={() => signOut({ callbackUrl: "/" })}
                              >
                                Log Out
                              </button>
                            </li>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Button asChild>
                            <Link
                              href="/registration"
                              className="theme-btn rounded-pill"
                            >
                              Create Portfolio
                            </Link>
                          </Button>
                          <Button asChild>
                            <Link
                              href="/login"
                              className="theme-btn rounded-pill"
                            >
                              Login
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
