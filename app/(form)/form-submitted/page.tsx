import Redirector from "@/components/utils/Redirector";
import SecondaryLink from "@/components/ui/SecondaryLink";

const Page = () => {
  return(
    <div className="grow flex flex-col items-center justify-center">
      <div className="grow flex flex-col items-center justify-center w-3/4">
        <h1 className="text-2xl text-center mb-4">Merci pour votre signalement !</h1>
        <small className="text-sm text-center text-gray-500">
          Nous vous remercions de votre contribution.
        </small>
        <Redirector href="/" time={5} additionalClasses="text-center text-gray-500" />
      </div>
      <SecondaryLink href="/">Retour à l&apos;accueil</SecondaryLink>
    </div>
  );
}

export default Page;
