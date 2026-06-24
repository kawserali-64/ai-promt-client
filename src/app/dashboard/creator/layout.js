import { requireRole } from "@/lib/core/session";

const CreatorLayout = async({ children }) => {
    await requireRole('Creator')
    return  children 

};

export default CreatorLayout;