const SecondaryButton = ({
    onClick,
    children,
}: {
    onClick: () => void;
    children: React.ReactNode;
}) => {
    return (
        <button
            onClick={onClick}
            className="block text-center text-theme-blue w-full border border-theme-blue rounded-lg p-2 active:scale-105 active:bg-theme-blue active:text-white transition-all duration-150 ease-out"
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
