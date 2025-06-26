import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import React from "react";


const LogoutBtn = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const logoutHandler = async () => {
        setError(null);
        setLoading(true);
        try {
            await authService.logout();
            dispatch(logout());
        } catch (e) {
            setError("Error during logout. Please try again.");
            console.log("Error during logout : error :: ", e);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
      <button
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={logoutHandler}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  )
}

export default LogoutBtn
