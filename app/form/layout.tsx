import UserLayout from "@/components/layouts/UserLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserLayout>
      {children}
    </UserLayout>
  );
}

export default Layout;
