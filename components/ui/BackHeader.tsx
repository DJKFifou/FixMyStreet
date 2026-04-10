const contentWrapperClasses = "text-xl leading-4.5 flex items-center gap-2";

const BackHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed top-0 left-0 w-full bg-theme-blue text-theme-offWhite flex items-center pt-7 pb-8 px-5 z-50">
        {children}
    </div>
);

const Content = ({ title }: { title: string }) => (
    <>
        <span className="material-symbols-outlined">arrow_back</span>
        {title}
    </>
);

export default BackHeader;
export { Content, contentWrapperClasses };
