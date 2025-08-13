import type { Metadata } from "next";
import { Sora, Geist } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@provider/ReactQueryClientProvider";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "suscripto.manager",
  description: "Controla tus suscripciones en un solo lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="es">
        <body
          className={`${sora.variable} ${geist.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
