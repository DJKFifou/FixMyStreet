import Redirector from "@/components/utils/Redirector";
import SecondaryButton from "../ui/SecondaryButton";

const ValidationStep = ({ restartForm }: { restartForm: () => void }) => {
    return (
        <div className="grow flex flex-col items-center justify-center">
            <div className="grow flex flex-col gap-4 items-center justify-center w-3/4">
                <h1 className="text-2xl text-center">Merci pour votre signalement !</h1>
                <small className="text-sm text-center text-gray-500">
                    Nous vous remercions de votre contribution.
                </small>
                <Redirector action={restartForm} time={5} additionalClasses="text-center text-gray-500" />
            </div>
            <SecondaryButton onClick={restartForm}>Retour à l&apos;accueil</SecondaryButton>
        </div>
    );
}

export default ValidationStep;
