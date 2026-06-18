'use client';
import { useSession } from "@/lib/auth-client";

const UserPage = () => {
    const { data: session,isPending } = useSession();
    if(isPending) {
        return <div>Loading...</div>;
    }
    const user = session?.user;

    return (
        <div>
            <p className="text-2xl font-bold">Welcome, {user?.name}!</p>
        </div>
    );
};

export default UserPage;