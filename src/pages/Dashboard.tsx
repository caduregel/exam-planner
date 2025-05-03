import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

function Dashboard() {
    const { session } = useAuth();

    if (!session) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="flex flex-col md:items-start gap-5 items-center" >
                <p>dashboard page</p>
            </div>
        </>
    )
}

export default Dashboard
