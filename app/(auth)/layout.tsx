import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center pt-[7%]">
      {children}
    </div>
  );
};

export default AuthLayout;
