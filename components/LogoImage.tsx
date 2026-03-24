import Image from "next/image";

export function LogoImage() {
    return (
        <div className="relative w-full h-75 md:hidden flex items-center justify-center">


            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/paysage-01.jpg')" }}
            />


            <div className="absolute inset-0 bg-theme-blue/70" />


            <div className="relative flex items-center space-x-3">
                <Image
                    src="/logo-fixmystreet-blanc.png"
                    width={90}
                    height={90}
                    alt="Logo FixMyStreet"
                />
                <span className="font-grotesk font-bold text-white text-3xl">
                    FixMyStreet
                </span>
            </div>

        </div>
    );
}
