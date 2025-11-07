import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ============================================================================
  // Image Optimization Configuration (Stream A)
  // ============================================================================
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],

    // Configure device sizes for responsive images
    // These correspond to common breakpoints: mobile, tablet, laptop, desktop
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Configure image sizes for different use cases
    // Used when an image doesn't have a specific width defined
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Allow SVG images with security restrictions
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Remote patterns for external images (Next.js 13+ recommended approach)
    remotePatterns: [
      // Example pattern for CDN or external images
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
  },

  // ============================================================================
  // Bundle Optimization Configuration (Stream B)
  // ============================================================================
  // Optimize webpack configuration for code splitting and bundle size reduction
  webpack: (config, { isServer }) => {
    // Optimize chunk splitting for better caching and parallel loading
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Separate vendor chunks for better caching
          default: false,
          vendors: false,
          // Framework chunk (React, Next.js core)
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Common libraries chunk
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module: any) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Commons chunk for shared code
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Only apply to client-side bundles
    if (!isServer) {
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
    }

    return config;
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production (except errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles

  // Reduce runtime overhead
  swcMinify: true, // Use SWC for faster minification

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-hook-form', '@hookform/resolvers'], // Tree shake large libraries
  },

  // Security Headers Configuration
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            // Content Security Policy (CSP)
            // Prevents XSS attacks by controlling which resources can be loaded
            // - default-src 'self': Only allow resources from same origin by default
            // - script-src 'self' 'unsafe-eval' 'unsafe-inline': Allow scripts from same origin
            //   Note: 'unsafe-eval' and 'unsafe-inline' are needed for Next.js development
            //   Consider tightening this for production with nonces or hashes
            // - style-src 'self' 'unsafe-inline': Allow styles from same origin and inline styles
            // - img-src 'self' data: https:: Allow images from same origin, data URIs, and HTTPS
            // - font-src 'self': Only allow fonts from same origin
            // - object-src 'none': Disallow plugins like Flash
            // - base-uri 'self': Restrict <base> tag URLs to same origin
            // - form-action 'self': Only allow form submissions to same origin
            // - frame-ancestors 'none': Prevent embedding in iframes (clickjacking protection)
            // - upgrade-insecure-requests: Automatically upgrade HTTP to HTTPS
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
          },
          {
            // X-Frame-Options: DENY
            // Prevents clickjacking attacks by preventing the page from being embedded in frames/iframes
            // DENY: Page cannot be displayed in a frame, regardless of the site attempting to do so
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // X-Content-Type-Options: nosniff
            // Prevents MIME type sniffing attacks
            // Ensures browsers respect the Content-Type header and don't try to guess the MIME type
            // Helps prevent attacks where malicious content is disguised as a different file type
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // X-XSS-Protection: 1; mode=block
            // Enables browser's built-in XSS filter (legacy feature for older browsers)
            // mode=block: Rather than sanitizing, completely blocks the page if XSS is detected
            // Note: Modern CSP is preferred, but this provides defense-in-depth for older browsers
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Referrer-Policy: strict-origin-when-cross-origin
            // Controls how much referrer information is shared when navigating away from the page
            // - Same-origin: Full URL is sent
            // - Cross-origin HTTPS to HTTPS: Only origin is sent (no path/query)
            // - Cross-origin HTTPS to HTTP: No referrer is sent (downgrade protection)
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Permissions-Policy
            // Controls which browser features and APIs can be used
            // Restricts access to sensitive device capabilities to prevent unauthorized access
            // - camera=(): Completely disable camera access
            // - microphone=(): Completely disable microphone access
            // - geolocation=(): Completely disable geolocation access
            // - payment=(): Completely disable payment APIs
            // - usb=(): Completely disable USB access
            // - interest-cohort=(): Opt out of Google's FLoC tracking
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          {
            // Strict-Transport-Security (HSTS)
            // Forces browsers to only connect via HTTPS for the specified duration
            // - max-age=31536000: Enforce HTTPS for 1 year (in seconds)
            // - includeSubDomains: Apply policy to all subdomains
            // - preload: Allow inclusion in browser HSTS preload lists
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
