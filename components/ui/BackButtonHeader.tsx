import BackHeader, { Content, contentWrapperClasses } from "./BackHeader";

interface BackButtonHeaderProps {
    onClick: () => void;
    title: string;
};

const BackButtonHeader = ({ onClick, title }: BackButtonHeaderProps) => (
    <BackHeader>
        <button onClick={onClick} className={contentWrapperClasses}>
            <Content title={title} />
        </button>
    </BackHeader>
);

export default BackButtonHeader;
