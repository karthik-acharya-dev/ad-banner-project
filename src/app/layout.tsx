import "../styles/globals.css";

const RootLayout: React.FC = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
