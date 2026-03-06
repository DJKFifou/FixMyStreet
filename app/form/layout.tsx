import FormLayout from "@/components/layouts/FormLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormLayout>
      {children}
    </FormLayout>
  );
}

export default Layout;
