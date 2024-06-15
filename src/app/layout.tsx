import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/nav/sidebar";
import { ThemeProvider } from "@/components/themes/theme-provider";

export const metadata: Metadata = {
  title: "Docusage AI Assistant",
  description: "Your document AI bot",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon_dark.svg',
        href: '/icon_dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon_dark.svg',
        href: '/icon_dark.svg',
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SideBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
