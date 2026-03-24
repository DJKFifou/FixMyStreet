
import { LoginForm } from "@/components/LoginForm";
import { LogoImage } from "@/components/LogoImage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <LogoImage />

      <div className="grow flex flex-col gap-4 rounded-lg bg-white w-full 
                      items-center justify-end px-6 py-12 md:py-6
                      -mt-6 shadow-lg relative z-10">
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">
            Connexion
          </h1>
          <small className="text-sm text-center text-gray-500">
            Vous devez vous connecter pour accéder à l&apos;application
          </small>
        </div>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
