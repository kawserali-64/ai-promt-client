import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";


const DashboardLayout = ({ children }) => {
    return (
        <div className="flex gap-4 min-h-screen">
            <DashboardSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;