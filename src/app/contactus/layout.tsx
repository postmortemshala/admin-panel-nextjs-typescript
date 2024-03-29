import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("seeksolution/layouts/AdminLayout"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Contact us",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
