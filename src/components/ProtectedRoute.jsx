import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import LikeButton from "./LikeButton";

export default function ProtectedRoute() {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();
    const isMineGame = location.pathname === "/mine";
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {isMineGame ? (
                <>
                    <div className="floating-left-mobile">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="home-btn-mobile"
                            title="Back to Dashboard"
                        >
                            <i className="fa-solid fa-house"></i>
                        </button>
                        <LikeButton gameId="mine-game" />
                    </div>
                    <div className="floating-profile-mobile">
                        <Profile />
                    </div>
                </>
            ) : (
                <div className="profile">
                    <Profile />
                </div>
            )}
            <Outlet />
        </>
    );
}