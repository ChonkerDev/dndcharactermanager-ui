import MainContent from "./MainContent";
import NavBar from "./navbar/NavBar";
import { Navigate } from 'react-router-dom'
import { useAuth } from "../AuthProvider";
import LoadingIndicator from "../loading/LoadingIndicator";

function Main() {
    const { user, loading } = useAuth();
    if (loading) {
        return <LoadingIndicator/>;
    }

    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <div className="app-container">
            <NavBar />
            <MainContent />
        </div>
    )
}

export default Main;