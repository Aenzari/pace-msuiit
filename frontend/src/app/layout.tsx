import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "P.A.C.E. | Professional Advancement & Career Enhancement — MSU-IIT",
  description:
    "The MSU-IIT career development platform connecting IITian talent, career guidance, and industry opportunities through Professional Advancement & Career Enhancement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[#F4F6F9] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}
