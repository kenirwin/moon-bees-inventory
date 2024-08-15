import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";
import Header from './components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Moon Bees Inventory",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <main className="container">
         {children}
        </main>
      </body>
    </html>
  );
}
