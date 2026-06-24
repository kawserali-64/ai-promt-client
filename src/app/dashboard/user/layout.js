import { requireRole } from "@/lib/core/session";

const UserLayout = async({ children }) => {
    await requireRole('User')
    return  children 

};

export default UserLayout;