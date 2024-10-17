"use client";

import { Inter } from "next/font/google";
import "/public/css/color.css";
import "/public/css/globals.css";
import "/public/css/layout.css";
import Header from "@/component/user/layout/Header";
import Footer from "@/component/user/layout/Footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import FooterBanner from "@/component/user/layout/FooterBanner";
import ScrollToTopButton from "@/component/user/layout/ScrollToTopButton";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/ad");

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          {!isAdminRoute && <Header />}
          {children}
          <ScrollToTopButton/>
          {!isAdminRoute && <FooterBanner />}
          {!isAdminRoute && <Footer />}
        </body>
      </SessionProvider>
    </html>
  );
}
