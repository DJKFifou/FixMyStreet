import { ReactNode } from "react";

const Recap = ({ title, children }: { title: string, children: ReactNode}) => (
  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
    <p className="text-sm font-medium mb-1">{title} :</p>
    <p className="text-base text-gray-700 whitespace-pre-linefont-medium">
      {children}
    </p>
  </div>
);

export default Recap;
