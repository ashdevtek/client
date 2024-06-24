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
      <body className="h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-row h-screen">
            <div><SideBar /></div>
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}