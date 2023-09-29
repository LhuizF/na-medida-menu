import "@/styles/globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { TabBar } from "@/components/TabBar";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Na Medida Menu",
  description: "Menu digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.className} bg-secondary`}>
        <Providers>
          <div className="max-w-xl m-auto shadow-xl">
            {children}
            <TabBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
