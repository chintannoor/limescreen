import { ReactNode } from "react";
import "@/styles/css/viewprofile.css";
import Script from "next/script";
import NextAuthProvider from "@/app/(home)/provider/nextAuthProvider";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { editProfile } from "@/app/(artist)/artist/edit/[id]/_actions/editServerActions";

interface LayoutProps {
  children: ReactNode;
}

const RootViewLayout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(options);

  const result = await editProfile(session?.user.id!);
  const userFavourite = result.data.artist.favourite;
  const getFavouriteStylesheet = () => {
    switch (userFavourite) {
      case 0 :
        return "/assets/css/vendor/sky.css";
      case 1:
        return "/assets/css/vendor/orange.css";
      case 2:
        return "/assets/css/vendor/amber.css";
      case 3:
        return "/assets/css/vendor/pink.css";
      case 4:
        return "/assets/css/vendor/lovender.css";
      default:
        return "/assets/css/vendor/white.css";
    }
  };
  return (
    <>
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
          <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="/assets/css/vendor/fontawesome.min.css"
          />
          <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
          <link rel="stylesheet" href="/assets/css/vendor/slick-theme.css" />
          <link rel="stylesheet" href="/assets/css/vendor/aos.css" />
          <link rel="stylesheet" href="/assets/css/plugins/feature.css" />
          <link rel="stylesheet" href="/assets/css/vendor/profileview.css" />
          <link rel="stylesheet" href={getFavouriteStylesheet()} />
        </head>
        <body
          className="white-version home-sticky spybody"
          data-spy="scroll"
          data-target=".navbar-example2"
          data-offset="150"
          data-aos-easing="ease"
          data-aos-duration="400"
          data-aos-delay="0"
        >
          <NextAuthProvider>{children}</NextAuthProvider>
          <Script src="/assets/js/vendor/jquery.js"></Script>
          <Script src="/assets/js/vendor/jquery.min.js"></Script>
          <Script src="/assets/js/vendor/modernizer.min.js"></Script>
          <Script src="/assets/js/vendor/feather.min.js"></Script>
          <Script src="/assets/js/vendor/slick.min.js"></Script>
          <Script src="/assets/js/vendor/bootstrap.js"></Script>
          <Script src="/assets/js/vendor/bootstrap.min.js"></Script>
          <Script src="/assets/js/vendor/text-type.js"></Script>
          <Script src="/assets/js/vendor/wow.js"></Script>
          <Script src="/assets/js/vendor/aos.js"></Script>
          <Script src="/assets/js/vendor/particles.js"></Script>
          <Script src="/assets/js/vendor/jquery-one-page-nav.js"></Script>
          {/* Main JS */}
          <Script src="/assets/js/profileview.js"></Script>
        </body>
      </html>
    </>
  );
};

export default RootViewLayout;
