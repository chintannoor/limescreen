import NextAuthProvider from "@/app/(home)/provider/nextAuthProvider";
import { options } from "@/app/api/auth/[...nextauth]/options";
import "@/app/globals.css";
import "@/styles/css/editpage.css";
import "@/styles/css/registration.css";
import { getServerSession } from "next-auth";
import Script from "next/script";

export default async function RootEditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Limescreen Entertainment & Productions</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/assets/images/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/assets/images/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/assets/images/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/images/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/images/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/images/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/images/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/images/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/images/favicon/favicon-96x96.png"
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        {/* CSS Import */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/cube-portfolio.min.css" />
        <link rel="stylesheet" href="/assets/css/slicknav.min.css" />
        <link rel="stylesheet" href="/assets/css/maginific-popup.min.css" />
        <link rel="stylesheet" href="/assets/css/jquery.fancybox.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/animate-text.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
        {/* <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" /> */}

        {/* for model css */}
        <link rel="stylesheet" href="/assets/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/css/reset.css" />
        <link rel="stylesheet" href="/assets/css/style.css " />
        <link rel="stylesheet" href="/assets/css/responsive.css " />
        <link rel="stylesheet" href="#" id="bonik_custom" />
        <link rel="stylesheet" href="/assets/css/vendor/edit.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.6/cropper.css"
        />
      </head>

      <body className="main-page">
        <div className="preloader-area" style={{ display: "none" }}>
          <div className="sk-cube-grid" style={{ display: "none" }}>
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
        </div>
        {/* Main Content */}
        <NextAuthProvider>{children}</NextAuthProvider>
        <Script src="https://code.jquery.com/jquery-3.6.4.min.js"></Script>
        <Script src="/assets/js/jquery.min.js"></Script>
        <Script src="/assets/js/popper.min.js"></Script>
        <Script src="/assets/js/bootstrap.min.js"></Script>
        <Script src="/assets/js/theme-option.js"></Script>
        <Script src="/assets/js/waypoints.min.js"></Script>
        <Script src="/assets/js/jquery.counterup.min.js"></Script>
        <Script src="/assets/js/modernizer.min.js"></Script>
        <Script src="/assets/js/magnific-popup.min.js"></Script>
        <Script src="/assets/js/cube-portfolio.min.js"></Script>
        {/* <Script src="/assets/js/owl.carousel.min.js"></Script> */}
        <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></Script>
        <Script src="/assets/js/wow.min.js"></Script>
        <Script src="/assets/js/jquery-fancybox.min.js"></Script>
        <Script src="/assets/js/jquery.slicknav.min.js"></Script>
        <Script src="/assets/js/steller.min.js"></Script>
        <Script src="/assets/js/easing.min.js"></Script>
        <Script src="/assets/js/jquery.scrollUp.min.js"></Script>
        <Script src="/assets/js/main.js"></Script>
      </body>
    </html>
  );
}
