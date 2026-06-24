"use client"

import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const DashboardHomePage = () => {
    const {data:session, isPending} = useSession()
    const user = session?.user;
  
    if (isPending) {
        return <div>Loading...</div>;
    } 
    if(user?.role === 'User') {
       redirect('/dashboard/user/profile');
    }
    
    if(user?.role ==='Creator'){
        redirect('/dashboard/creator/my-prompt')
    }

    if(user?.role ==='Admin'){
        redirect('/dashboard/admin')
    }
    
    return (
        <div>
            <h1>Dashboard Home</h1>
        </div>
    );
};

export default DashboardHomePage;