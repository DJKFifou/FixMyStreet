import { UpdatePasswordForm } from "@/components/UpdatePasswordForm";

export default function Page() {
  return (
    <>
      <div className="grow flex flex-col items-center justify-center w-3/4">
        <h1 className="text-2xl text-center mb-4">
          Changer votre mot de passe
        </h1>
      </div>
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </>
  );
}
