const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh px-6 py-12 md:py-6">
      {children}
    </div>
  );
}

export default Layout;
