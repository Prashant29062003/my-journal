import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";


const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
            .then(()=> {
                dispatch(logout());
            })
            .catch((e)=> {
                console.log("Error during logout : error :: ", e);
            })
    }
  return (
    <div>
      <button className="inline-block
       px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={()=> logoutHandler()}>
        Logout
      </button>
    </div>
  )
}

export default LogoutBtn
