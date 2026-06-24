import { requireRole } from "@/lib/core/session";

const AdminLayout = async({ children }) => {
    await requireRole('Admin')
    return  children 

};

export default AdminLayout;