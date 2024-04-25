import React, { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <span className="text-red-400">{children}</span>;
};

export default ErrorMessage;
