import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterPage from "@/components/Footer";
import NavbarPage from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import AIChatbot from "@/components/AIChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Prompt Marketplace",
  description: "Create, improve, and discover powerful AI prompts.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavbarPage />

        {children}

        <FooterPage />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />

        <AIChatbot />
      </body>
    </html>
  );
}