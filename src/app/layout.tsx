import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "P.A.C.E. — Professional Advancement & Career Ecosystem | MSU-IIT",
  description:
    "Empowering IITian Futures through intelligent career development, recruiter networking, and counselor support. The official career platform of Mindanao State University – Iligan Institute of Technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F4F6F9] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}
