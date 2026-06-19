import { AllPromtSidebar } from "@/components/allpromt/AllPromtSidebar";

const Pormtlayout = ({ children }) => {
    return (
        <div className="flex gap-4 min-h-screen">
            <AllPromtSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default Pormtlayout;