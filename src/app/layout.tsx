import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://epic-landing-page.com'),
  title: {
    default: 'Epic Landing Page - Create Stunning Landing Pages That Convert',
    template: '%s | Epic Landing Page'
  },
  description: 'Create stunning landing pages that convert visitors into customers. Professional templates, drag-and-drop builder, and analytics to grow your business.',
  keywords: [
    'landing page builder',
    'landing page templates',
    'conversion optimization',
    'lead generation',
    'marketing pages',
    'landing page design',
    'website builder',
    'conversion rate optimization',
    'sales funnel',
    'marketing automation'
  ],
  authors: [{ name: 'Epic Landing Page Team' }],
  creator: 'Epic Landing Page',
  publisher: 'Epic Landing Page',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://epic-landing-page.com',
    siteName: 'Epic Landing Page',
    title: 'Epic Landing Page - Create Stunning Landing Pages That Convert',
    description: 'Create stunning landing pages that convert visitors into customers. Professional templates, drag-and-drop builder, and analytics to grow your business.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Epic Landing Page - Create stunning landing pages',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@epiclanding',
    creator: '@epiclanding',
    title: 'Epic Landing Page - Create Stunning Landing Pages That Convert',
    description: 'Create stunning landing pages that convert visitors into customers. Professional templates, drag-and-drop builder, and analytics to grow your business.',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://epic-landing-page.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
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
