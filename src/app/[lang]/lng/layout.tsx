interface IProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
