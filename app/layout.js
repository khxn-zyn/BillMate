import "./globals.css";
import SupportChat from "./components/SupportChat";

export const metadata = {
  title: "BillMate",
  description: "Simple invoicing for Australian businesses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SupportChat />
      </body>
    </html>
  );
}
