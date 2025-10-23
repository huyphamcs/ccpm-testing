import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { StructuredData } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YourBrand - Streamline Your Workflow, 10x Your Productivity",
    template: "%s | YourBrand",
  },
  description:
    "The all-in-one platform for modern teams to collaborate, automate, and deliver results faster than ever. Start your 14-day free trial today.",
  keywords: [
    "productivity",
    "collaboration",
    "workflow automation",
    "team management",
    "project management",
    "SaaS platform",
  ],
  authors: [{ name: "YourBrand" }],
  creator: "YourBrand",
  publisher: "YourBrand",
  metadataBase: new URL("https://yourbrand.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourbrand.com",
    siteName: "YourBrand",
    title: "YourBrand - Streamline Your Workflow, 10x Your Productivity",
    description:
      "The all-in-one platform for modern teams to collaborate, automate, and deliver results faster than ever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YourBrand - Collaboration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourbrand",
    creator: "@yourbrand",
    title: "YourBrand - Streamline Your Workflow, 10x Your Productivity",
    description:
      "The all-in-one platform for modern teams to collaborate, automate, and deliver results faster than ever.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
