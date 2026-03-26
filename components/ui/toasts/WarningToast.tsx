import Base from "./Base";

const WarningToast = ({ children }: { children: React.ReactNode }) => (
  <Base
  borderColor="border-theme-lightRed"
  bgColor="bg-theme-lightRed/33"
  textColor="text-theme-red"
  icon="warning">
    {children}
  </Base>
);

export default WarningToast;
