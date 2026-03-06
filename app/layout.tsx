import type { Metadata } from "next";
import "material-symbols";
import "./globals.css";

export const metadata: Metadata = {
  title: "FixMyStreet",
  description: "Plateforme de signalement de problèmes de circulation urbaine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
