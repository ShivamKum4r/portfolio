import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivam Kumar",
  description:
    "Portfolio of Shivam Kumar - Software Developer specializing in modern web technologies",
  keywords: [
    "Shivam Kumar",
    "Shivam",
    "Kumar",
    "Portfolio",
    "Software Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  openGraph: {
    title: "Shivam Kumar - Full Stack Developer",
    description:
      "Portfolio of Shivam Kumar - Software Developer specializing in modern web technologies",
    type: "website",
    url: "https://Shivam.tech",
    siteName: "Shivam Kumar",
    locale: "en_US",
    images: [
      {
        url: "https://shivam.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivam Kumar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    title: "Shivam Kumar - Full Stack Developer",
    description:
      "Portfolio of Shivam Kumar- Software Developer specializing in modern web technologies",
    card: "summary_large_image",
    site: "@ShivamKumar",
    creator: "@ShivamKumar",
    images: [
      {
        url: "https://shivam.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivam Kumar- Full Stack Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
