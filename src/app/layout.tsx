import "./globals.css";

export const metadata = {
  title: 'Boleias',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-pt">
      <body className="bg-white">{children}</body>
    </html>
  )
}
