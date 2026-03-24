
import { UpdatePasswordForm } from "@/components/UpdatePasswordForm";
import { LogoImage } from "@/components/LogoImage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <LogoImage />
      <div className="grow flex flex-col gap-4 w-full items-center justify-end px-6 py-12 md:py-6">
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">
            Changer votre mot de passe
          </h1>
        </div>
        <div className="w-full max-w-sm">
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
