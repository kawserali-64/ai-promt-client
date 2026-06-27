import { Suspense } from "react";
import { AllPromtSidebar } from "@/components/allpromt/AllPromtSidebar";

const Pormtlayout = ({ children }) => {
  return (
    <div className="flex gap-4 min-h-screen">
      <Suspense fallback={<div className="w-64" />}>
        <AllPromtSidebar />
      </Suspense>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Pormtlayout;