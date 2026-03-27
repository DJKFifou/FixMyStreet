import { SignUpForm } from "@/components/SignUpForm";

export default function Page() {
  return (
    <>
      <div className="grow flex flex-col items-center justify-center w-3/4">
        <h1 className="text-2xl text-center mb-4">Enregistrement</h1>
        <small className="text-sm text-center text-gray-500">
          L&apos;enregistrement est suivi d&apos;une validation par mail
        </small>
      </div>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </>
  );
}
