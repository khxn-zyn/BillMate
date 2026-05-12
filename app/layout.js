import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "BillMate — Free Invoicing for Australian Tradies",
  description: "Create professional invoices in 30 seconds. GST auto-calculated, PDF export, payment tracking. Free forever. Built for Australian tradies.",
  keywords: "invoicing software, free invoicing, Australian tradies, GST calculator, invoice app, plumber invoice, electrician invoice",
  openGraph: {
    title: "BillMate — Free Invoicing for Australian Tradies",
    description: "Create professional invoices in 30 seconds. GST sorted automatically. Free forever. No credit card.",
    url: "https://bill-mate.com.au",
    siteName: "BillMate",
    type: "website",
    images: [{ url: "https://bill-mate.com.au/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BillMate — Free Invoicing for Australian Tradies",
    description: "Create professional invoices in 30 seconds. GST sorted automatically. Free forever.",
    images: ["https://bill-mate.com.au/api/og"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
