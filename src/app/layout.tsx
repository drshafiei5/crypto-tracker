import type { Metadata } from "next";
import localFont from "next/font/local";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Styles
import "./globals.css";

const dana = localFont({ src: '../../public/assets/fonts/dana-fanum-regular.woff2' });

export const metadata: Metadata = {
    title: "ارز دیجیتال",
    description: "قیمت ارزهای دیجیتال",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa-IR" dir="rtl">
            <body className={dana.className}>{children}</body>
        </html>
    );
}
