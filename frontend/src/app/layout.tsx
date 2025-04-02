import type { Metadata } from "next";
import "../styles/base/global.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";



export const metadata: Metadata = {
  title: "UX Glossary",
  description: "Интерактивный глоссарий терминов UX-дизайна — изучай, добавляй и сохраняй ключевые понятия в одном месте.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
      <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}