import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProviderComponent } from "@/providers/AuthProviderComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Junior Full-stack Developer - Calabia",
  description: "Developed By Mackrislan Calabia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviderComponent>
          <Header />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            pauseOnFocusLoss={false}
            closeOnClick
            rtl={false}
            limit={1}
            theme="colored"
          />
          <Footer />
        </AuthProviderComponent>
      </body>
    </html>
  );
}
