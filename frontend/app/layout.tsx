import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gala Importaciones | Noticias",
  description: "Plataforma de noticias corporativa para Gala Importaciones Ecuador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
       <body className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white">
        <div className="relative z-10 flex flex-col min-h-screen backdrop-blur-[2px]">
          {children}
        </div>
       </body>
    </html>
  );
}
