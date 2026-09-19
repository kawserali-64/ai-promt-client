import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-zinc-100/70 dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-300">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;