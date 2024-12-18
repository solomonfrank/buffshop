import AppProvider from "@lib/tanstack-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const Helvetical = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeueThin.otf",
      weight: "300",
    },
    {
      path: "./fonts/HelveticaNeueRoman.otf",
      weight: "400",
    },
    {
      path: "./fonts/HelveticaNeueMedium.otf",
      weight: "500",
    },
    {
      path: "./fonts/HelveticaNeueBold.otf",
      weight: "700",
    },
    {
      path: "./fonts/HelveticaNeueHeavy.otf",
      weight: "800",
    },

    {
      path: "./fonts/HelveticaNeueBlack.otf",
      weight: "900",
    },
  ],
  variable: "--font-buff",
});

export const metadata: Metadata = {
  title: "Buffshop",
  description: "Buffshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Helvetical.variable}`}>
      <body className={`font-sans`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
