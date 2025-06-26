import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/general/app-sidebar";

const font = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Occupass Test Hadziq",
  description: "Created by Hadziq Razin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="w-[calc(100%-var(--sidebar-width))]">
              <main>
                <SidebarTrigger />
                <div className="px-4 py-10 flex h-dvh justify-center">
                  <div className="max-w-[1200px] overflow-x-auto">
                    {children}
                  </div>
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
