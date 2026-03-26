import { LoginForm } from "@/components/LoginForm";

export default function Page() {
  return (
    <>
      <div className="grow flex flex-col items-center justify-center w-3/4">
        <h1 className="text-2xl text-center mb-4">Connexion</h1>
        <small className="text-sm text-center text-gray-500">
          Vous devez vous connecter pour accéder à l&apos;application
        </small>
      </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </>
  );
}
