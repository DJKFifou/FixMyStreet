import { LogoImage } from "@/components/LogoImage";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh">
      <LogoImage />
      <div
        className="grow flex flex-col gap-4 rounded-lg bg-white w-full 
                          items-center justify-center px-6 py-12 md:py-6
                          -mt-6 shadow-lg relative z-10"
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
