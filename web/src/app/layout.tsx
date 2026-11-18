import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Brand Fulfillment — Where Brands Get Delivered",
  description:
    "Your one-stop shop for branded merchandise, uniforms, promotional products, and custom online company stores.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Switzer (Fontshare) — the noho typeface */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-page text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
