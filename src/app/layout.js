import "./globals.css";
import localFont from "next/font/local";

const satoshi = localFont({ src: "./satoshi.woff2", variable: "--font-satoshi" });
const seasons = localFont({ src: "./seasons.woff2", variable: "--font-seasons" });
const yu = localFont({ src: "./yu.woff2", variable: "--font-yu" });

export const metadata = {
  title: "Wakayama",
  description: "Best. Prefecture. Ever.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${seasons.variable}  ${yu.variable}`}>{children}</body>
    </html>
  );
}
