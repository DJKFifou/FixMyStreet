import Base from "./Base";

const InfoToast = ({ children }: { children: React.ReactNode }) => (
  <Base
  borderColor="border-theme-lightBlue"
  bgColor="bg-theme-lightBlue/33"
  textColor="text-theme-blue"
  icon="info">
    {children}
  </Base>
);

export default InfoToast;
