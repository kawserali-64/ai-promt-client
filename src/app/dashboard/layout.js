import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex gap-4 min-h-screen">
            <DashboardSidebar />
            <div className="flex-1">
                {children}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </div>
    );
};

export default DashboardLayout;